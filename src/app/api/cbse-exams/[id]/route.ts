import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExam from "@/models/CbseExam";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const exam = await CbseExam.findByIdAndUpdate(id, body, { new: true });
        if (!exam) {
            return NextResponse.json({ error: "Exam not found" }, { status: 404 });
        }
        return NextResponse.json(exam);
    } catch (error: any) {
        console.error("API Error (CBSE Exams PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const exam = await CbseExam.findByIdAndDelete(id);
        if (!exam) {
            return NextResponse.json({ error: "Exam not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Exam deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Exams DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
