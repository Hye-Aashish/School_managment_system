import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ZoomSetting from "@/models/ZoomSetting";

export async function GET() {
  try {
    await dbConnect();
    let setting = await ZoomSetting.findOne();
    if (!setting) {
      setting = await ZoomSetting.create({
        apiKey: "",
        apiSecret: "",
        useGoogleCalendar: false,
        parentLiveClass: false,
      });
    }
    return NextResponse.json({ success: true, data: setting });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    let setting = await ZoomSetting.findOne();
    if (setting) {
      setting = await ZoomSetting.findByIdAndUpdate(setting._id, body, { new: true, runValidators: true });
    } else {
      setting = await ZoomSetting.create(body);
    }

    return NextResponse.json({ success: true, data: setting });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
