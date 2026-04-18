import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Section from "@/models/Section";

// GET: List all sections
export async function GET() {
    await dbConnect();
    try {
        const sections = await Section.find({}).sort({ name: 1 });
        return NextResponse.json({ success: true, data: sections });
    } catch (error) {
        console.error("API Error (Sections GET):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Add new section
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { name } = body;
        if (!name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });

        const section = await Section.create({ name });
        return NextResponse.json({ success: true, data: section });
    } catch (error: any) {
        console.error("API Error (Sections POST):", error);
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Section already exists" }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE: Delete section
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

        await Section.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Section deleted" });
    } catch (error) {
        console.error("API Error (Sections DELETE):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
