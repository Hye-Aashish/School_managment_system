import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseAssessment from "@/models/CbseAssessment";

export async function GET() {
    try {
        await dbConnect();
        const assessments = await CbseAssessment.find({}).sort({ created_at: -1 });
        return NextResponse.json(assessments);
    } catch (error: any) {
        console.error("API Error (CBSE Assessments GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const assessment = await CbseAssessment.create(body);
        return NextResponse.json(assessment, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Assessments POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
