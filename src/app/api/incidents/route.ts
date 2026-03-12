import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Incident from "@/models/Incident";

export async function GET() {
  await dbConnect();
  try {
    const incidents = await Incident.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: incidents });
  } catch (error: any) {
    console.error("GET Incidents Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    console.log("POST Incident Body:", body);
    const incident = await Incident.create(body);
    return NextResponse.json({ success: true, data: incident });
  } catch (error: any) {
    console.error("POST Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create incident" }, { status: 500 });
  }
}
