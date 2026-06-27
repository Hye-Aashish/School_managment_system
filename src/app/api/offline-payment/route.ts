import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import OfflineBankPayment from "@/models/OfflineBankPayment";
import FeePayment from "@/models/FeePayment";
import Student from "@/models/Student";
import FeeMaster from "@/models/FeeMaster";
import FeeGroup from "@/models/FeeGroup";
import FeeType from "@/models/FeeType";

export async function GET(req: NextRequest) {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const search = searchParams.get("search");
        const status = searchParams.get("status");
        
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        let studentQuery: any = {};
        if (className) studentQuery.class = className;
        if (section) studentQuery.section = section;
        if (search) {
            const searchRegex = { $regex: search, $options: "i" };
            studentQuery.$or = [
                { fname: searchRegex },
                { lname: searchRegex },
                { admission_no: searchRegex }
            ];
        }

        let paymentQuery: any = {};
        if (status) paymentQuery.status = status;

        if (Object.keys(studentQuery).length > 0) {
            const students = await Student.find(studentQuery).select("_id");
            const studentIds = students.map(s => s._id);
            paymentQuery.student = { $in: studentIds };
        }

        const totalEntries = await OfflineBankPayment.countDocuments(paymentQuery);
        const payments = await OfflineBankPayment.find(paymentQuery)
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
            .sort({ submit_date: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            data: payments,
            totalEntries,
            totalPages: Math.ceil(totalEntries / limit),
            currentPage: page
        });
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
