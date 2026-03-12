import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OnlineCoursePayment from "@/models/OnlineCoursePayment";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get("studentId");
        
        let query = {};
        if (studentId) {
            query = { student: studentId };
        }
        
        const payments = await OnlineCoursePayment.find(query)
            .populate("student")
            .populate("course")
            .sort({ submit_date: -1 });
            
        return NextResponse.json(payments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const payment = await OnlineCoursePayment.create(body);
        return NextResponse.json(payment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to submit payment" }, { status: 500 });
    }
}
