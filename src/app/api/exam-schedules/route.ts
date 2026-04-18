import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ExamSchedule from "@/models/ExamSchedule";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
     try {
          await dbConnect();
          const { searchParams } = new URL(request.url);
          const examId = searchParams.get("examId");
          
          if (!examId) {
               return NextResponse.json({ success: false, error: "Exam ID is required" }, { status: 400 });
          }
          
          const schedules = await ExamSchedule.find({ exam: examId }).sort({ createdAt: 1 });
          return NextResponse.json({ success: true, data: schedules });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          // body should be an array of schedules or a single one
          if (Array.isArray(body)) {
               const schedules = await ExamSchedule.insertMany(body);
               return NextResponse.json({ success: true, data: schedules }, { status: 201 });
          } else {
               const schedule = await ExamSchedule.create(body);
               return NextResponse.json({ success: true, data: schedule }, { status: 201 });
          }
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
