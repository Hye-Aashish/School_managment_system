import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseAssignObservation from "@/models/CbseAssignObservation";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const assignment = await CbseAssignObservation.findByIdAndUpdate(id, body, { new: true });
        if (!assignment) {
            return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
        }
        return NextResponse.json(assignment);
    } catch (error: any) {
        console.error("API Error (CBSE Assign Observations PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const assignment = await CbseAssignObservation.findByIdAndDelete(id);
        if (!assignment) {
            return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Assignment deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Assign Observations DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
