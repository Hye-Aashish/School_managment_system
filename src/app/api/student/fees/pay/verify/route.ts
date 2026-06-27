import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import FeeMaster from "@/models/FeeMaster";
import FeePayment from "@/models/FeePayment";
import FeeDiscount from "@/models/FeeDiscount";
import PaymentConfig from "@/models/PaymentConfig";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Authenticate
        let token = req.cookies.get("auth_token")?.value;
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) token = authHeader.substring(7);
        }
        if (!token) return apiResponse.error("Not authenticated", 401);

        let sessionUser: any = null;
        try {
            sessionUser = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        } catch {
            return apiResponse.error("Invalid session", 401);
        }

        const body = await req.json();
        const {
            feeMasterId,
            orderId,
            amount,
            provider,
            razorpay_payment_id,
            razorpay_signature,
            discountCode,
            isMockSuccessClick,
        } = body;

        if (!feeMasterId || !orderId || !amount || !provider) {
            return apiResponse.badRequest("feeMasterId, orderId, amount, and provider are required");
        }

        const payAmount = Number(amount);

        // Validate fee master
        const master = await FeeMaster.findById(feeMasterId).lean() as any;
        if (!master) return apiResponse.error("Fee record not found", 404);

        // Calculate outstanding
        const existingPayments = await FeePayment.find({
            student: sessionUser.id,
            fee_master: feeMasterId,
            status: { $ne: "Refunded" },
        }).lean() as any[];
        const alreadyPaid = existingPayments.reduce((s: number, p: any) => s + (p.amount_paid ?? 0) + (p.discount_amount ?? 0), 0);
        const outstanding = Math.max(0, (master.amount ?? 0) - alreadyPaid);

        // Split payment into base and fine
        const basePaid = Math.min(payAmount, outstanding);
        const finePaid = Math.max(0, payAmount - basePaid);

        // Handle mock order
        if (orderId.startsWith("mock_fee_")) {
            if (isMockSuccessClick) {
                // Record the payment
                const payment = await FeePayment.create({
                    student: sessionUser.id,
                    fee_master: feeMasterId,
                    amount_paid: basePaid,
                    payment_mode: "Online",
                    date: new Date().toISOString().split("T")[0],
                    discount_amount: 0,
                    fine_amount: finePaid,
                    status: "Success",
                    reference_no: orderId,
                    online_payment_id: orderId,
                    note: `Online payment via ${provider.toUpperCase()} (Simulated)`,
                });
                const newPaid = alreadyPaid + basePaid;
                return apiResponse.success({
                    success: true,
                    paid: newPaid,
                    outstanding: Math.max(0, (master.amount ?? 0) - newPaid),
                    paymentId: payment._id.toString(),
                });
            }
            // Poll: check if already paid via mock
            const recentPay = await FeePayment.findOne({
                student: sessionUser.id,
                fee_master: feeMasterId,
                reference_no: orderId,
            }).lean();
            if (recentPay) {
                const newPaid = alreadyPaid + basePaid;
                return apiResponse.success({ success: true, paid: newPaid, outstanding: Math.max(0, (master.amount ?? 0) - newPaid) });
            }
            return apiResponse.success({ success: false, status: "PENDING" });
        }

        // Get payment config
        const activeConfig = await PaymentConfig.findOne({ provider }).lean() as any;
        if (!activeConfig) return apiResponse.error(`Config for ${provider} not found`, 400);

        const { keyId, keySecret } = activeConfig;
        let sandbox = activeConfig.sandbox;
        if (provider === "cashfree" && keyId.startsWith("TEST")) sandbox = true;

        let isVerified = false;

        if (provider === "razorpay") {
            if (!razorpay_payment_id || !razorpay_signature) {
                // Background poll: check razorpay order status
                try {
                    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
                    const rzpRes = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
                        headers: { Authorization: `Basic ${auth}` },
                    });
                    if (rzpRes.ok) {
                        const rzpOrder = await rzpRes.json();
                        if (rzpOrder.status === "paid") {
                            isVerified = true;
                        }
                    }
                } catch { /* ignore poll error */ }

                if (!isVerified) {
                    return apiResponse.success({ success: false, status: "PENDING" });
                }
            } else {
                // Verify HMAC signature
                const generatedSig = crypto
                    .createHmac("sha256", keySecret)
                    .update(orderId + "|" + razorpay_payment_id)
                    .digest("hex");
                if (generatedSig === razorpay_signature) isVerified = true;
            }
        } else if (provider === "cashfree") {
            const cfUrl = sandbox
                ? `https://sandbox.cashfree.com/pg/orders/${orderId}`
                : `https://api.cashfree.com/pg/orders/${orderId}`;
            const cfRes = await fetch(cfUrl, {
                headers: { "x-client-id": keyId, "x-client-secret": keySecret, "x-api-version": "2023-08-01" },
            });
            if (cfRes.ok) {
                const cfOrder = await cfRes.json();
                if (cfOrder.order_status === "PAID") isVerified = true;
            }
        }

        if (!isVerified) {
            return apiResponse.success({ success: false, status: "PENDING" });
        }

        // Apply discount if any
        let discountAmount = 0;
        let discountId: string | undefined;
        if (discountCode) {
            const discount = await FeeDiscount.findOne({
                discount_code: discountCode.trim().toUpperCase(),
            }).lean() as any;
            if (discount && discount.use_count > 0) {
                if (discount.type === "percentage" && discount.percentage) {
                    discountAmount = (basePaid * discount.percentage) / 100;
                } else if (discount.type === "fixAmount" && discount.amount) {
                    discountAmount = Math.min(discount.amount, basePaid);
                }
                discountId = discount._id.toString();
                await FeeDiscount.findByIdAndUpdate(discountId, { $inc: { use_count: -1 } });
            }
        }

        // Prevent duplicate payment
        const existingForOrder = await FeePayment.findOne({
            student: sessionUser.id,
            fee_master: feeMasterId,
            online_payment_id: razorpay_payment_id ?? orderId,
        }).lean();

        if (!existingForOrder) {
            await FeePayment.create({
                student: sessionUser.id,
                fee_master: feeMasterId,
                amount_paid: basePaid,
                payment_mode: "Online",
                date: new Date().toISOString().split("T")[0],
                discount_amount: discountAmount,
                fine_amount: finePaid,
                status: "Success",
                reference_no: razorpay_payment_id ?? orderId,
                online_payment_id: razorpay_payment_id ?? orderId,
                note: `Online payment via ${provider.toUpperCase()}`,
                ...(discountId ? { discount: discountId } : {}),
            });
        }

        const newPaid = alreadyPaid + basePaid + discountAmount;
        return apiResponse.success({
            success: true,
            paid: newPaid,
            outstanding: Math.max(0, (master.amount ?? 0) - newPaid),
        });

    } catch (error: any) {
        console.error("Fee Payment Verify Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
