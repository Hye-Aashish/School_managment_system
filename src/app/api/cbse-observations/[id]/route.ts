import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseObservation from "@/models/CbseObservation";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const observation = await CbseObservation.findByIdAndUpdate(id, body, { new: true });
        if (!observation) {
            return NextResponse.json({ error: "Observation not found" }, { status: 404 });
        }
        return NextResponse.json(observation);
    } catch (error: any) {
        console.error("API Error (CBSE Observations PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const observation = await CbseObservation.findByIdAndDelete(id);
        if (!observation) {
            return NextResponse.json({ error: "Observation not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Observation deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Observations DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
