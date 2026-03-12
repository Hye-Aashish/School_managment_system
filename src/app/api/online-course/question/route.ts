import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CourseQuestion from "@/models/CourseQuestion";

export async function GET() {
    try {
        await dbConnect();
        const questions = await CourseQuestion.find().sort({ created_at: -1 });
        return NextResponse.json(questions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const question = await CourseQuestion.create(body);
        return NextResponse.json(question, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to create question" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        await CourseQuestion.findByIdAndDelete(id);
        return NextResponse.json({ message: "Question deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        const body = await req.json();
        const question = await CourseQuestion.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(question);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update question" }, { status: 500 });
    }
}
