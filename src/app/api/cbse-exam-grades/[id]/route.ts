import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExamGrade from "@/models/CbseExamGrade";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const examGrade = await CbseExamGrade.findByIdAndUpdate(id, body, { new: true });
        if (!examGrade) {
            return NextResponse.json({ error: "Exam Grade not found" }, { status: 404 });
        }
        return NextResponse.json(examGrade);
    } catch (error: any) {
        console.error("API Error (CBSE Exam Grades PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const examGrade = await CbseExamGrade.findByIdAndDelete(id);
        if (!examGrade) {
            return NextResponse.json({ error: "Exam Grade not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Exam Grade deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Exam Grades DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
