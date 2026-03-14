import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseObservationParameter from "@/models/CbseObservationParameter";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const param = await CbseObservationParameter.findByIdAndUpdate(id, body, { new: true });
        if (!param) {
            return NextResponse.json({ error: "Parameter not found" }, { status: 404 });
        }
        return NextResponse.json(param);
    } catch (error: any) {
        console.error("API Error (CBSE Observation Parameters PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const param = await CbseObservationParameter.findByIdAndDelete(id);
        if (!param) {
            return NextResponse.json({ error: "Parameter not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Parameter deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Observation Parameters DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
