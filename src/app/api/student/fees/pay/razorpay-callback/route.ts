import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import FeeMaster from "@/models/FeeMaster";
import FeePayment from "@/models/FeePayment";
import FeeDiscount from "@/models/FeeDiscount";
import PaymentConfig from "@/models/PaymentConfig";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Parse query parameters
        const { searchParams } = new URL(req.url);
        const feeMasterId = searchParams.get("feeMasterId");
        const studentId = searchParams.get("studentId");
        const amountStr = searchParams.get("amount");
        const discountCode = searchParams.get("discountCode");

        if (!feeMasterId || !studentId || !amountStr) {
            console.error("Fee Callback missing feeMasterId, studentId, or amount parameters.");
            return NextResponse.redirect(new URL("/payments/fee-checkout?status=failed&error=Missing+payment+context", req.url), 303);
        }

        const payAmount = Number(amountStr);
        if (isNaN(payAmount) || payAmount <= 0) {
            console.error("Fee Callback invalid amount.");
            return NextResponse.redirect(new URL("/payments/fee-checkout?status=failed&error=Invalid+payment+amount", req.url), 303);
        }

        // Validate fee master
        const master = await FeeMaster.findById(feeMasterId).lean() as any;
        if (!master) {
            console.error("Fee Callback fee master not found.");
            return NextResponse.redirect(new URL("/payments/fee-checkout?status=failed&error=Fee+record+not+found", req.url), 303);
        }

        // 2. Parse form body from Razorpay POST
        const formData = await req.formData();
        const razorpay_order_id = formData.get("razorpay_order_id") as string;
        const razorpay_payment_id = formData.get("razorpay_payment_id") as string;
        const razorpay_signature = formData.get("razorpay_signature") as string;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.error("Razorpay POST body missing required signature parameters.");
            return NextResponse.redirect(new URL(`/payments/fee-checkout?status=failed&error=Signature+parameters+missing&feeMasterId=${feeMasterId}&amount=${payAmount}`, req.url), 303);
        }

        // Get Razorpay secret key
        const activeConfig = await PaymentConfig.findOne({ provider: "razorpay" }).lean() as any;
        if (!activeConfig) {
            console.error("Razorpay configuration not found.");
            return NextResponse.redirect(new URL(`/payments/fee-checkout?status=failed&error=Razorpay+configuration+missing&feeMasterId=${feeMasterId}&amount=${payAmount}`, req.url), 303);
        }

        const { keySecret } = activeConfig;

        // 3. Verify signature using HMAC-SHA256
        const generatedSignature = crypto
            .createHmac("sha256", keySecret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            console.error("Signature verification failed.");
            return NextResponse.redirect(new URL(`/payments/fee-checkout?status=failed&error=Payment+signature+verification+failed&feeMasterId=${feeMasterId}&amount=${payAmount}`, req.url), 303);
        }

        // Calculate already paid to compute fine correctly
        const existingPayments = await FeePayment.find({
            student: studentId,
            fee_master: feeMasterId,
            status: { $ne: "Refunded" },
        }).lean() as any[];
        const alreadyPaid = existingPayments.reduce((s: number, p: any) => s + (p.amount_paid ?? 0) + (p.discount_amount ?? 0), 0);
        const outstanding = Math.max(0, (master.amount ?? 0) - alreadyPaid);

        // Split payment into base and fine
        const basePaid = Math.min(payAmount, outstanding);
        const finePaid = Math.max(0, payAmount - basePaid);

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
            student: studentId,
            fee_master: feeMasterId,
            online_payment_id: razorpay_payment_id,
        }).lean();

        const now = new Date();
        if (!existingForOrder) {
            await FeePayment.create({
                student: studentId,
                fee_master: feeMasterId,
                amount_paid: basePaid,
                payment_mode: "Online",
                date: now.toISOString().split("T")[0],
                discount_amount: discountAmount,
                fine_amount: finePaid,
                status: "Success",
                reference_no: razorpay_payment_id,
                online_payment_id: razorpay_payment_id,
                note: "Online payment via RAZORPAY (WebView Callback)",
                ...(discountId ? { discount: discountId } : {}),
            });
        }

        // Redirect back to checkout success page
        const feeTitle = (master.fee_type as any)?.name ?? (master.fee_group as any)?.name ?? "School Fee";
        const successUrl = `/payments/fee-checkout?status=success&feeMasterId=${feeMasterId}&amount=${payAmount}&feeTitle=${encodeURIComponent(feeTitle)}&outstanding=${Math.max(0, (master.amount ?? 0) - (alreadyPaid + basePaid + discountAmount))}`;
        return NextResponse.redirect(new URL(successUrl, req.url), 303);

    } catch (error: any) {
        console.error("Razorpay Fee Callback Error:", error);
        return NextResponse.redirect(new URL(`/payments/fee-checkout?status=failed&error=${encodeURIComponent(error.message)}`, req.url), 303);
    }
}
