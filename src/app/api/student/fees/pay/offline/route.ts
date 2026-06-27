import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import FeeMaster from "@/models/FeeMaster";
import FeePayment from "@/models/FeePayment";
import FeeDiscount from "@/models/FeeDiscount";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Authenticate
        let token = req.cookies.get("auth_token")?.value;
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
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
            amount,
            paymentMode,
            referenceNo,
            note,
            attachmentUrl,
            discountCode,
            paymentDate,
        } = body;

        if (!feeMasterId || !amount || !paymentMode) {
            return apiResponse.badRequest("feeMasterId, amount, and paymentMode are required");
        }

        const payAmount = Number(amount);
        if (isNaN(payAmount) || payAmount <= 0) {
            return apiResponse.badRequest("amount must be a positive number");
        }

        // Validate fee master exists
        const master = await FeeMaster.findById(feeMasterId).lean() as any;
        if (!master) return apiResponse.error("Fee record not found", 404);

        // Calculate already paid
        const existingPayments = await FeePayment.find({
            student: sessionUser.id,
            fee_master: feeMasterId,
            status: { $ne: "Refunded" },
        }).lean() as any[];

        const alreadyPaid = existingPayments.reduce((sum: number, p: any) => {
            return sum + (p.amount_paid ?? 0) + (p.discount_amount ?? 0);
        }, 0);

        const outstanding = Math.max(0, (master.amount ?? 0) - alreadyPaid);

        // Calculate fine
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
            return apiResponse.badRequest(`Payment amount (₹${payAmount}) exceeds outstanding balance plus fine (₹${totalMaxAllowed.toFixed(2)})`);
        }

        // Split payment into base and fine
        const basePaid = Math.min(payAmount, outstanding);
        const finePaid = Math.max(0, payAmount - basePaid);

        // Validate and apply discount code
        let discountAmount = 0;
        let discountId: string | undefined;

        if (discountCode) {
            const discount = await FeeDiscount.findOne({
                discount_code: discountCode.trim().toUpperCase(),
            }).lean() as any;

            if (!discount) {
                return apiResponse.badRequest("Invalid discount code");
            }
            if (discount.expiry_date && new Date() > new Date(discount.expiry_date)) {
                return apiResponse.badRequest("Discount code has expired");
            }
            if (discount.use_count <= 0) {
                return apiResponse.badRequest("Discount code usage limit exceeded");
            }

            if (discount.type === "percentage" && discount.percentage) {
                discountAmount = (basePaid * discount.percentage) / 100;
            } else if (discount.type === "fixAmount" && discount.amount) {
                discountAmount = Math.min(discount.amount, basePaid);
            }

            discountId = discount._id.toString();

            // Decrement use count
            await FeeDiscount.findByIdAndUpdate(discountId, {
                $inc: { use_count: -1 },
            });
        }

        // Create payment record
        const paymentData: any = {
            student: sessionUser.id,
            fee_master: feeMasterId,
            amount_paid: basePaid,
            payment_mode: paymentMode,
            date: paymentDate ?? new Date().toISOString().split("T")[0],
            discount_amount: discountAmount,
            fine_amount: finePaid,
            status: "Success",
        };

        if (referenceNo) paymentData.reference_no = referenceNo;
        if (note) paymentData.note = note;
        if (attachmentUrl) paymentData.attachment_url = attachmentUrl;
        if (discountId) paymentData.discount = discountId;

        const payment = await FeePayment.create(paymentData);

        // Return updated summary for this fee master
        const newPaid = alreadyPaid + basePaid + discountAmount;
        const newOutstanding = Math.max(0, (master.amount ?? 0) - newPaid);
        let newStatus = "Unpaid";
        if (newPaid >= (master.amount ?? 0)) newStatus = "Paid";
        else if (newPaid > 0) newStatus = "Partially Paid";
        else if (master.due_date && now > new Date(master.due_date)) newStatus = "Overdue";

        return apiResponse.success({
            paymentId: payment._id.toString(),
            feeMasterId,
            paid: newPaid,
            outstanding: newOutstanding,
            status: newStatus,
            discountApplied: discountAmount,
            fineCharged: fineAmount,
        });

    } catch (error: any) {
        console.error("Offline Fee Payment Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
