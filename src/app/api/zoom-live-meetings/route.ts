import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ZoomLiveMeeting from "@/models/ZoomLiveMeeting";

export async function GET() {
  try {
    await dbConnect();
    const liveMeetings = await ZoomLiveMeeting.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: liveMeetings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newLiveMeeting = await ZoomLiveMeeting.create(body);
    return NextResponse.json({ success: true, data: newLiveMeeting }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
