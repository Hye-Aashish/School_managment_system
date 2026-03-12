import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentIncident from "@/models/StudentIncident";

export async function GET() {
  await dbConnect();
  try {
    const assignments = await StudentIncident.find({}).populate("student").populate("incident").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: assignments });
  } catch (error: any) {
    console.error("GET Assign Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    console.log("POST Assign Incident Body:", body);
    const assignment = await StudentIncident.create(body);
    return NextResponse.json({ success: true, data: assignment });
  } catch (error: any) {
    console.error("POST Assign Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
