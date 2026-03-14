import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExamSchedule from "@/models/CbseExamSchedule";
import CbseExam from "@/models/CbseExam";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const examId = searchParams.get("examId");

        let query = {};
        if (examId) {
            query = { exam: examId };
        }

        const schedules = await CbseExamSchedule.find(query)
            .populate("exam", "name")
            .sort({ date: 1, time: 1 });
        return NextResponse.json(schedules);
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const schedule = await CbseExamSchedule.create(body);
        return NextResponse.json(schedule, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
