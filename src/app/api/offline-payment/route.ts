import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import OfflineBankPayment from "@/models/OfflineBankPayment";
import FeePayment from "@/models/FeePayment";
import Student from "@/models/Student";
import FeeMaster from "@/models/FeeMaster";
import FeeGroup from "@/models/FeeGroup";
import FeeType from "@/models/FeeType";

export async function GET() {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        const payments = await OfflineBankPayment.find()
            .populate({
                path: "student",
                model: Student
            })
            .populate({
                path: "fee_master",
                model: FeeMaster,
                populate: [
                    { path: "fee_group", model: FeeGroup },
                    { path: "fee_type", model: FeeType }
                ]
            })
            .sort({ submit_date: -1 });

        return NextResponse.json(payments);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        const { id, status, note } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updateData: any = { 
            status, 
            status_date: new Date() 
        };

        if (status === "Approved") {
            // Generate a dummy Payment ID if approved
            const payment = await OfflineBankPayment.findById(id);
            if (payment && !payment.payment_id) {
                updateData.payment_id = "12" + payment._id.toString().slice(-4) + "/1";
                
                // Also create a confirmed FeePayment record
                await FeePayment.create({
                    student: payment.student,
                    fee_master: payment.fee_master,
                    amount_paid: payment.amount,
                    payment_mode: "Bank Transfer",
                    date: new Date().toISOString().split("T")[0],
                    reference_no: payment.reference_no,
                    note: payment.note || `Approved Offline Payment: ${id}`,
                    status: "Success"
                });
            }
        }

        const updatedPayment = await OfflineBankPayment.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return NextResponse.json(updatedPayment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
