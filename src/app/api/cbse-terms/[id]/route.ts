import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseTerm from "@/models/CbseTerm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const term = await CbseTerm.findByIdAndUpdate(id, body, { new: true });
        if (!term) {
            return NextResponse.json({ error: "Term not found" }, { status: 404 });
        }
        return NextResponse.json(term);
    } catch (error: any) {
        console.error("API Error (CBSE Terms PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const term = await CbseTerm.findByIdAndDelete(id);
        if (!term) {
            return NextResponse.json({ error: "Term not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Term deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Terms DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
