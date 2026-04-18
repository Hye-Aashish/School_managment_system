import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import StudentCV from "@/models/StudentCV";
import Student from "@/models/Student";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get("studentId");
        
        if (studentId) {
            const cv = await StudentCV.findOne({ studentId }).lean();
            return NextResponse.json({ success: true, data: cv });
        }

        const cvs = await StudentCV.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: cvs });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { studentId, ...cvData } = body;
        
        const cv = await StudentCV.findOneAndUpdate(
            { studentId },
            { $set: { ...cvData, updated_at: new Date() } },
            { upsert: true, new: true }
        );
        
        return NextResponse.json({ success: true, data: cv });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
