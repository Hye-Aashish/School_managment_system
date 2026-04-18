import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Subject from "@/models/Subject";

// GET: List all subjects
export async function GET() {
    await dbConnect();
    try {
        const subjects = await Subject.find({}).sort({ name: 1 });
        return NextResponse.json({ success: true, data: subjects });
    } catch (error) {
        console.error("API Error (Subjects GET):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Add or Update subject
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, name, type, code } = body;
        if (!name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });

        if (id) {
            const updatedSubject = await Subject.findByIdAndUpdate(id, { name, type, code }, { new: true });
            return NextResponse.json({ success: true, data: updatedSubject });
        } else {
            const newSubject = await Subject.create({ name, type, code });
            return NextResponse.json({ success: true, data: newSubject });
        }
    } catch (error: any) {
        console.error("API Error (Subjects POST):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE: Delete subject
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

        await Subject.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Subject deleted" });
    } catch (error) {
        console.error("API Error (Subjects DELETE):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
