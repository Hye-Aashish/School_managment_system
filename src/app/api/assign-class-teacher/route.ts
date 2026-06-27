import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import AssignClassTeacher from "@/models/AssignClassTeacher";
import Staff from "@/models/Staff";

export async function GET() {
    try {
        await dbConnect();
        
        // Ensure Staff model is registered
        if (!Staff) {
             console.error("Staff model not initialized");
        }

        // Populate the teachers
        const assignments = await AssignClassTeacher.find({})
            .populate("teachers", "firstName lastName staffId")
            .sort({ class: 1, section: 1 })
            .lean();
            
        return NextResponse.json({ success: true, data: assignments });
    } catch (error: any) {
        console.error("Assign Class Teacher GET Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { className, section, teachers } = body;
        
        if (!className || !section || !teachers || !teachers.length) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }
        
        // Update or create
        const assignment = await AssignClassTeacher.findOneAndUpdate(
            { class: className, section },
            { teachers },
            { new: true, upsert: true }
        ).populate("teachers", "firstName lastName staffId");
        
        return NextResponse.json({ success: true, data: assignment });
    } catch (error: any) {
        console.error("Assign Class Teacher POST Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        
        if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
        
        await AssignClassTeacher.findByIdAndDelete(id);
        
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Assign Class Teacher DELETE Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
