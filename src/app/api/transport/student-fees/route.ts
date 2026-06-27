import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import StudentTransportPayment from "@/models/StudentTransportPayment";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get("studentId");

        if (studentId) {
            const payments = await StudentTransportPayment.find({ studentId }).sort({ created_at: -1 }).lean();
            return NextResponse.json({ success: true, data: payments });
        } else {
            const payments = await StudentTransportPayment.find({}).sort({ created_at: -1 }).lean();
            return NextResponse.json({ success: true, data: payments });
        }
    } catch (error) {
        console.error("GET StudentTransportPayment error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        
        if (!body.studentId || !body.month || !body.amountPaid) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const payment = await StudentTransportPayment.create(body);
        return NextResponse.json({ success: true, data: payment });
    } catch (error) {
        console.error("POST StudentTransportPayment error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
