import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ZoomLiveClass from "@/models/ZoomLiveClass";

export async function GET() {
  try {
    await dbConnect();
    const liveClasses = await ZoomLiveClass.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: liveClasses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newLiveClass = await ZoomLiveClass.create(body);
    return NextResponse.json({ success: true, data: newLiveClass }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
