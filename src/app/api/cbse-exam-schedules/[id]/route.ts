import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExamSchedule from "@/models/CbseExamSchedule";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const schedule = await CbseExamSchedule.findByIdAndUpdate(id, body, { new: true });
        if (!schedule) {
            return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
        }
        return NextResponse.json(schedule);
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const schedule = await CbseExamSchedule.findByIdAndDelete(id);
        if (!schedule) {
            return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Schedule deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
