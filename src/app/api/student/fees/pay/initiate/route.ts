import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import FeeMaster from "@/models/FeeMaster";
import FeePayment from "@/models/FeePayment";
import FeeDiscount from "@/models/FeeDiscount";
import PaymentConfig from "@/models/PaymentConfig";
import Student from "@/models/Student";
import FeeType from "@/models/FeeType";
import FeeGroup from "@/models/FeeGroup";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Prevent tree-shaking of model registration
        const _ = [FeeType, FeeGroup];

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
        const { feeMasterId, amount, discountCode } = body;

        if (!feeMasterId || !amount) {
            return apiResponse.badRequest("feeMasterId and amount are required");
        }

        const payAmount = Number(amount);
        if (isNaN(payAmount) || payAmount <= 0) {
            return apiResponse.badRequest("amount must be a positive number");
        }

        // Validate fee master
        const master = await FeeMaster.findById(feeMasterId)
            .populate("fee_type")
            .populate("fee_group")
            .lean() as any;
        if (!master) return apiResponse.error("Fee record not found", 404);

        // Calculate outstanding
        const existingPayments = await FeePayment.find({
            student: sessionUser.id,
            fee_master: feeMasterId,
            status: { $ne: "Refunded" },
        }).lean() as any[];
        const alreadyPaid = existingPayments.reduce((sum: number, p: any) => {
            return sum + (p.amount_paid ?? 0) + (p.discount_amount ?? 0);
        }, 0);
        const outstanding = Math.max(0, (master.amount ?? 0) - alreadyPaid);

        // Calculate fine if overdue
        const now = new Date();
        let fineAmount = 0;
        if (master.due_date && now > new Date(master.due_date) && outstanding > 0) {
            if (master.fine_type === "fixAmount") {
                fineAmount = master.fine_amount ?? 0;
            } else if (master.fine_type === "percentage" && master.fine_percentage) {
                fineAmount = (outstanding * master.fine_percentage) / 100;
            }
        }

        const totalMaxAllowed = outstanding + fineAmount;
        if (payAmount > totalMaxAllowed + 0.01) {
            return apiResponse.badRequest(`Payment amount exceeds outstanding balance plus fine (₹${totalMaxAllowed.toFixed(2)})`);
        }

        // Validate discount code (just validate here, apply in verify)
        let discountAmount = 0;
        if (discountCode) {
            const discount = await FeeDiscount.findOne({
                discount_code: discountCode.trim().toUpperCase(),
            }).lean() as any;
            if (!discount) return apiResponse.badRequest("Invalid discount code");
            if (discount.expiry_date && new Date() > new Date(discount.expiry_date)) {
                return apiResponse.badRequest("Discount code has expired");
            }
            if (discount.use_count <= 0) return apiResponse.badRequest("Discount code usage limit exceeded");

            if (discount.type === "percentage" && discount.percentage) {
                discountAmount = (payAmount * discount.percentage) / 100;
            } else if (discount.type === "fixAmount" && discount.amount) {
                discountAmount = Math.min(discount.amount, payAmount);
            }
        }

        const feeTypeName = (master.fee_type as any)?.name ?? (master.fee_group as any)?.name ?? "Fee";

        // Get active payment gateway
        const activeConfig = await PaymentConfig.findOne({ enabled: true }).lean() as any;
        if (!activeConfig) return apiResponse.error("No active online payment gateway configured.", 400);

        const { provider, keyId, keySecret } = activeConfig;
        let sandbox = activeConfig.sandbox;
        if (provider === "cashfree" && keyId.startsWith("TEST")) sandbox = true;
        if (!keyId || !keySecret) return apiResponse.error("Payment gateway credentials not set.", 400);

        // Get student details for prefill
        const studentDoc = await Student.findById(sessionUser.id).lean() as any;
        const host = req.headers.get("host") || "localhost:3000";
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const baseUrl = `${protocol}://${host}`;
        const netAmount = payAmount - discountAmount;

        if (provider === "razorpay") {
            try {
                const rzpUrl = "https://api.razorpay.com/v1/orders";
                const authHeader = `Basic ${Buffer.from(keyId + ":" + keySecret).toString("base64")}`;
                const response = await fetch(rzpUrl, {
                    method: "POST",
                    headers: { Authorization: authHeader, "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: Math.round(netAmount * 100), // paise
                        currency: "INR",
                        receipt: `fee_${feeMasterId.substring(0, 8)}_${sessionUser.id.substring(0, 6)}_${Date.now()}`,
                    }),
                    signal: AbortSignal.timeout(8000),
                });
                if (!response.ok) throw new Error(await response.text());
                const rzpOrder = await response.json();

                return apiResponse.success({
                    provider: "razorpay",
                    orderId: rzpOrder.id,
                    amount: rzpOrder.amount,
                    currency: rzpOrder.currency,
                    keyId,
                    feeMasterId,
                    feeTitle: feeTypeName,
                    studentId: sessionUser.id,
                    discountAmount,
                    netAmount,
                });
            } catch (err: any) {
                console.error("Razorpay fee order failed, falling back to mock:", err.message);
                const mockOrderId = `mock_fee_rzp_${feeMasterId.substring(0, 8)}_${Date.now()}`;
                return apiResponse.success({
                    provider: "razorpay",
                    orderId: mockOrderId,
                    amount: Math.round(netAmount * 100),
                    currency: "INR",
                    keyId: keyId || "mock_key",
                    feeMasterId,
                    feeTitle: feeTypeName,
                    studentId: sessionUser.id,
                    discountAmount,
                    netAmount,
                    isMock: true,
                    mockReason: `Razorpay error: ${err.message}`,
                });
            }
        } else if (provider === "cashfree") {
            try {
                const cfUrl = sandbox
                    ? "https://sandbox.cashfree.com/pg/orders"
                    : "https://api.cashfree.com/pg/orders";

                let customerPhone = (studentDoc?.mobile || "").replace(/\D/g, "");
                if (customerPhone.length < 10 || customerPhone.length > 15) customerPhone = "9999999999";
                let customerEmail = studentDoc?.email || "student@school.com";
                if (!customerEmail.includes("@")) customerEmail = "student@school.com";
                const customerName = studentDoc
                    ? `${studentDoc.fname} ${studentDoc.lname || ""}`.trim()
                    : "Student";

                const orderId = `fee_${feeMasterId.substring(0, 8)}_${sessionUser.id.substring(0, 6)}_${Date.now()}`;
                const response = await fetch(cfUrl, {
                    method: "POST",
                    headers: {
                        "x-client-id": keyId,
                        "x-client-secret": keySecret,
                        "x-api-version": "2023-08-01",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        order_id: orderId,
                        order_amount: netAmount,
                        order_currency: "INR",
                        customer_details: {
                            customer_id: sessionUser.id,
                            customer_phone: customerPhone,
                            customer_email: customerEmail,
                            customer_name: customerName,
                        },
                        order_meta: {
                            return_url: `${baseUrl}/payments/fee-checkout?status=redirect&orderId=${orderId}&feeMasterId=${feeMasterId}&amount=${netAmount}&feeTitle=${encodeURIComponent(feeTypeName)}${discountCode ? `&discountCode=${encodeURIComponent(discountCode.trim().toUpperCase())}` : ""}`,
                        },
                    }),
                    signal: AbortSignal.timeout(8000),
                });
                if (!response.ok) throw new Error(await response.text());
                const cfOrder = await response.json();
                const discountParam = discountCode ? `&discountCode=${encodeURIComponent(discountCode.trim().toUpperCase())}` : "";
                const paymentLink = `${baseUrl}/payments/fee-checkout?paymentSessionId=${cfOrder.payment_session_id}&orderId=${cfOrder.order_id}&feeMasterId=${feeMasterId}&amount=${netAmount}&feeTitle=${encodeURIComponent(feeTypeName)}&sandbox=${sandbox}${discountParam}`;

                return apiResponse.success({
                    provider: "cashfree",
                    orderId: cfOrder.order_id,
                    paymentLink,
                    feeMasterId,
                    feeTitle: feeTypeName,
                    discountAmount,
                    netAmount,
                });
            } catch (err: any) {
                console.error("Cashfree fee order failed, falling back to mock:", err.message);
                const mockOrderId = `mock_fee_cf_${feeMasterId.substring(0, 8)}_${Date.now()}`;
                const discountParam = discountCode ? `&discountCode=${encodeURIComponent(discountCode.trim().toUpperCase())}` : "";
                const mockLink = `${baseUrl}/payments/fee-checkout?orderId=${mockOrderId}&feeMasterId=${feeMasterId}&amount=${netAmount}&feeTitle=${encodeURIComponent(feeTypeName)}${discountParam}`;
                return apiResponse.success({
                    provider: "cashfree",
                    orderId: mockOrderId,
                    paymentLink: mockLink,
                    feeMasterId,
                    feeTitle: feeTypeName,
                    discountAmount,
                    netAmount,
                    isMock: true,
                    mockReason: `Cashfree error: ${err.message}`,
                });
            }
        }

        return apiResponse.error("Unsupported gateway provider", 400);

    } catch (error: any) {
        console.error("Fee Payment Initiate Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
