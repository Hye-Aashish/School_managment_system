import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OnlineQuestion from "@/models/OnlineQuestion";

export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const subject = searchParams.get("subject");
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const level = searchParams.get("level");
        const questionType = searchParams.get("questionType");

        const query: any = {};
        if (subject) query.subject = subject;
        if (className) query.class = className;
        if (section) query.section = section;
        if (level) query.level = level;
        if (questionType) query.question_type = questionType;

        const questions = await OnlineQuestion.find(query).sort({ created_at: -1 });
        return NextResponse.json({ success: true, data: questions });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch questions" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const question = await OnlineQuestion.create(body);
        return NextResponse.json({ success: true, data: question });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        const body = await request.json();
        const question = await OnlineQuestion.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ success: true, data: question });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        await OnlineQuestion.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete question" }, { status: 500 });
    }
}
