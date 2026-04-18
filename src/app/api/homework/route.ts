import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Homework from "@/models/Homework";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const sectionName = searchParams.get("section");
        const subjectName = searchParams.get("subject");

        let query: any = {};
        if (className) query.class = className;
        if (sectionName) query.section = sectionName;
        if (subjectName) query.subject = subjectName;

        const homeworks = await Homework.find(query).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: homeworks });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const homework = await Homework.create(body);
        return NextResponse.json({ success: true, data: homework });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
        await Homework.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
