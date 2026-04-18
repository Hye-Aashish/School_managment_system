import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Exam from "@/models/Exam";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
     try {
          await dbConnect();
          const { searchParams } = new URL(request.url);
          const groupId = searchParams.get("groupId");
          
          let query = {};
          if (groupId) {
               query = { examGroup: groupId };
          }
          
          const exams = await Exam.find(query).populate("examGroup").sort({ createdAt: -1 });
          return NextResponse.json({ success: true, data: exams });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          const exam = await Exam.create(body);
          return NextResponse.json({ success: true, data: exam }, { status: 201 });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
