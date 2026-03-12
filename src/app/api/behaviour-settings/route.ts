import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BehaviourSetting from "@/models/BehaviourSetting";

export async function GET() {
  await dbConnect();
  try {
    let setting = await BehaviourSetting.findOne({});
    if (!setting) {
      setting = await BehaviourSetting.create({ 
        isModuleEnabled: true, 
        parentVisible: false, 
        studentVisible: false 
      });
    }
    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    let setting = await BehaviourSetting.findOne({});
    if (setting) {
      setting = await BehaviourSetting.findByIdAndUpdate(setting._id, body, { new: true });
    } else {
      setting = await BehaviourSetting.create(body);
    }
    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
  }
}
