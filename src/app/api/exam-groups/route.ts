import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ExamGroup from "@/models/ExamGroup";

export const dynamic = "force-dynamic";

export async function GET() {
     try {
          await dbConnect();
          const groups = await ExamGroup.find({}).sort({ createdAt: -1 });
          return NextResponse.json({ success: true, data: groups });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          const group = await ExamGroup.create(body);
          return NextResponse.json({ success: true, data: group }, { status: 201 });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
