import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GmeetLiveMeeting from "@/models/GmeetLiveMeeting";

export async function GET() {
  try {
    await dbConnect();
    const liveMeetings = await GmeetLiveMeeting.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: liveMeetings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newLiveMeeting = await GmeetLiveMeeting.create(body);
    return NextResponse.json({ success: true, data: newLiveMeeting }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
