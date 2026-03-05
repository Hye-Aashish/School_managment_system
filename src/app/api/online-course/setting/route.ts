import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CourseSetting from "@/models/CourseSetting";

export async function GET() {
    try {
        await dbConnect();
        let setting = await CourseSetting.findOne();
        if (!setting) {
            setting = await CourseSetting.create({});
        }
        return NextResponse.json(setting);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        let setting = await CourseSetting.findOne();
        if (setting) {
            setting = await CourseSetting.findByIdAndUpdate(setting._id, body, { new: true });
        } else {
            setting = await CourseSetting.create(body);
        }
        return NextResponse.json(setting);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
    }
}
