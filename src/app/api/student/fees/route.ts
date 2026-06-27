import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import FeeMaster from "@/models/FeeMaster";
import FeePayment from "@/models/FeePayment";
import Student from "@/models/Student";
import FeeType from "@/models/FeeType";
import FeeGroup from "@/models/FeeGroup";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Prevent tree-shaking of model registration
        const _ = [FeeType, FeeGroup];

        // Authenticate student from Bearer token
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

        const studentId = sessionUser.id;

        // Fetch student to get class info
        const student = await Student.findById(studentId).lean() as any;
        if (!student) return apiResponse.error("Student not found", 404);

        // Fetch all fee masters applicable to this student:
        // Either assigned directly to the student OR to their class (via fee_group)
        const feeMasters = await FeeMaster.find({
            $or: [
                { student: studentId },
                { student: { $exists: false } },
                { student: null },
            ]
        })
        .populate("fee_type")
        .populate("fee_group")
        .lean() as any[];

        // Fetch all payments for this student
        const payments = await FeePayment.find({ student: studentId })
            .populate("fee_master")
            .populate("discount")
            .lean() as any[];

        const now = new Date();

        const records = feeMasters.map((master: any) => {
            const masterId = master._id.toString();

            // Filter payments for this fee master
            const masterPayments = payments.filter((p: any) => {
                const pmId = p.fee_master?._id
                    ? p.fee_master._id.toString()
                    : p.fee_master?.toString?.() ?? "";
                return pmId === masterId;
            });

            // Calculate total paid (exclude refunded)
            let paid = 0;
            for (const p of masterPayments) {
                if ((p.status ?? "Success").toLowerCase() !== "refunded") {
                    paid += (p.amount_paid ?? 0) + (p.discount_amount ?? 0);
                }
            }

            const amount = master.amount ?? 0;
            const outstanding = Math.max(0, amount - paid);

            // Compute fine if overdue
            let fineAmount = 0;
            if (outstanding > 0 && master.due_date) {
                const due = new Date(master.due_date);
                if (now > due) {
                    if (master.fine_type === "fixAmount") {
                        fineAmount = master.fine_amount ?? 0;
                    } else if (master.fine_type === "percentage" && master.fine_percentage) {
                        fineAmount = (outstanding * master.fine_percentage) / 100;
                    }
                }
            }

            const dueDate = master.due_date
                ? new Date(master.due_date).toISOString()
                : null;

            let status = "Unpaid";
            if (paid >= amount) {
                status = "Paid";
            } else if (paid > 0) {
                status = "Partially Paid";
            } else if (master.due_date && now > new Date(master.due_date)) {
                status = "Overdue";
            }

            const feeTypeName = (master.fee_type as any)?.name;
            const feeGroupName = (master.fee_group as any)?.name;
            const category = feeTypeName ?? feeGroupName ?? "School Fee";

            const paymentHistory = masterPayments
                .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((p: any) => ({
                    id: p._id.toString(),
                    amount: p.amount_paid ?? 0,
                    discountAmount: p.discount_amount ?? 0,
                    fineAmount: p.fine_amount ?? 0,
                    mode: p.payment_mode ?? "Cash",
                    date: p.date ?? p.created_at,
                    referenceNo: p.reference_no ?? null,
                    note: p.note ?? null,
                    attachmentUrl: p.attachment_url ?? null,
                    status: p.status ?? "Success",
                    onlinePaymentId: p.online_payment_id ?? null,
                }));

            return {
                id: masterId,
                category,
                amount,
                paid,
                outstanding,
                dueDate,
                status,
                fineAmount,
                payments: paymentHistory,
            };
        });

        return apiResponse.success(records);

    } catch (error: any) {
        console.error("Student Fees GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
