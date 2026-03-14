import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExam from "@/models/CbseExam";
import CbseTerm from "@/models/CbseTerm";
import CbseExamGrade from "@/models/CbseExamGrade";
import CbseAssessment from "@/models/CbseAssessment";

export async function GET() {
    try {
        await dbConnect();
        const exams = await CbseExam.find({})
            .populate("term", "name")
            .populate("examGrade", "name")
            .populate("assessment", "name")
            .sort({ created_at: -1 });
        return NextResponse.json(exams);
    } catch (error: any) {
        console.error("API Error (CBSE Exams GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const exam = await CbseExam.create(body);
        return NextResponse.json(exam, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Exams POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
