import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseTemplate from "@/models/CbseTemplate";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const template = await CbseTemplate.findByIdAndUpdate(id, body, { new: true });
        if (!template) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }
        return NextResponse.json(template);
    } catch (error: any) {
        console.error("API Error (CBSE Templates PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const template = await CbseTemplate.findByIdAndDelete(id);
        if (!template) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Template deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Templates DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
