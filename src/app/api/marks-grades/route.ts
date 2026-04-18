import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MarksGrade from "@/models/MarksGrade";

export const dynamic = "force-dynamic";

export async function GET() {
     try {
          await dbConnect();
          const grades = await MarksGrade.find({}).sort({ createdAt: -1 });
          return NextResponse.json({ success: true, data: grades });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          const grade = await MarksGrade.create(body);
          return NextResponse.json({ success: true, data: grade }, { status: 201 });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
