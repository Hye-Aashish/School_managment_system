import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Lesson from "@/models/Lesson";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const subject = searchParams.get("subject");

        let query: any = {};
        if (className) query.class = className;
        if (section) query.section = section;
        if (subject) query.subject = subject;

        const lessons = await Lesson.find(query).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: lessons });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json(); // Array of lessons or single lesson
        if (Array.isArray(body)) {
            const lessons = await Lesson.insertMany(body);
            return NextResponse.json({ success: true, data: lessons });
        } else {
            const lesson = await Lesson.create(body);
            return NextResponse.json({ success: true, data: lesson });
        }
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
        await Lesson.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
