import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GmeetSetting from "@/models/GmeetSetting";

export async function GET() {
  try {
    await dbConnect();
    // Assuming there is only one global setting document
    let setting = await GmeetSetting.findOne();
    if (!setting) {
      // Create default if none exists
      setting = await GmeetSetting.create({
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

    let setting = await GmeetSetting.findOne();
    if (setting) {
      // Update existing
      setting = await GmeetSetting.findByIdAndUpdate(setting._id, body, { new: true, runValidators: true });
    } else {
      // Create new
      setting = await GmeetSetting.create(body);
    }

    return NextResponse.json({ success: true, data: setting });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
