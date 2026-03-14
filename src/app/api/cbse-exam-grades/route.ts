import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExamGrade from "@/models/CbseExamGrade";

export async function GET() {
    try {
        await dbConnect();
        const grades = await CbseExamGrade.find({}).sort({ created_at: -1 });
        return NextResponse.json(grades);
    } catch (error: any) {
        console.error("API Error (CBSE Exam Grades GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const examGrade = await CbseExamGrade.create(body);
        return NextResponse.json(examGrade, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Exam Grades POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
