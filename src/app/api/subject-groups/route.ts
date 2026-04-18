import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import SubjectGroup from "@/models/SubjectGroup";
import Class from "@/models/Class";
import Section from "@/models/Section";
import Subject from "@/models/Subject";

// GET: List all subject groups with population
export async function GET() {
    await dbConnect();
    try {
        const groups = await SubjectGroup.find({})
            .populate("class")
            .populate("sections")
            .populate("subjects")
            .sort({ name: 1 });
        return NextResponse.json({ success: true, data: groups });
    } catch (error) {
        console.error("API Error (SubjectGroups GET):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Add or Update subject group
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, name, classId, sections, subjects, description } = body;
        if (!name || !classId) return NextResponse.json({ success: false, error: "Name and Class are required" }, { status: 400 });

        const payload = {
            name,
            class: classId,
            sections,
            subjects,
            description
        };

        if (id) {
            const updatedGroup = await SubjectGroup.findByIdAndUpdate(id, payload, { new: true });
            return NextResponse.json({ success: true, data: updatedGroup });
        } else {
            const newGroup = await SubjectGroup.create(payload);
            return NextResponse.json({ success: true, data: newGroup });
        }
    } catch (error: any) {
        console.error("API Error (SubjectGroups POST):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE: Delete subject group
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

        await SubjectGroup.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Subject Group deleted" });
    } catch (error) {
        console.error("API Error (SubjectGroups DELETE):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
