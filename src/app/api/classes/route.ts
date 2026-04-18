import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Class from "@/models/Class";
import Section from "@/models/Section";

// GET: List all classes with sections
export async function GET() {
    await dbConnect();
    try {
        const classes = await Class.find({}).populate("sections").sort({ name: 1 });
        return NextResponse.json({ success: true, data: classes });
    } catch (error) {
        console.error("API Error (Classes GET):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Add or Update class
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, name, sections } = body;
        if (!name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });

        if (id) {
            const updatedClass = await Class.findByIdAndUpdate(id, { name, sections }, { new: true });
            return NextResponse.json({ success: true, data: updatedClass });
        } else {
            const newClass = await Class.create({ name, sections });
            return NextResponse.json({ success: true, data: newClass });
        }
    } catch (error: any) {
        console.error("API Error (Classes POST):", error);
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Class already exists" }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE: Delete class
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

        await Class.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Class deleted" });
    } catch (error) {
        console.error("API Error (Classes DELETE):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
