import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OnlineCoursePayment from "@/models/OnlineCoursePayment";
import StudentCourse from "@/models/StudentCourse";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const { status, note } = body;

        const payment = await OnlineCoursePayment.findById(id);
        if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

        payment.status = status;
        payment.status_date = new Date();
        if (note) payment.note = note;

        await payment.save();

        if (status === "Approved") {
            // Create or update StudentCourse entry
            await StudentCourse.findOneAndUpdate(
                { student: payment.student, course: payment.course },
                { 
                    status: "Active",
                    purchase_date: new Date()
                },
                { upsert: true, new: true }
            );
        }

        return NextResponse.json(payment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update payment" }, { status: 500 });
    }
}
