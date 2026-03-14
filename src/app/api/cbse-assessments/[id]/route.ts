import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseAssessment from "@/models/CbseAssessment";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const assessment = await CbseAssessment.findByIdAndUpdate(id, body, { new: true });
        if (!assessment) {
            return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
        }
        return NextResponse.json(assessment);
    } catch (error: any) {
        console.error("API Error (CBSE Assessments PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const assessment = await CbseAssessment.findByIdAndDelete(id);
        if (!assessment) {
            return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Assessment deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Assessments DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
