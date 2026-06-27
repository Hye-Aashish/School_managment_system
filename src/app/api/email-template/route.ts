import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import EmailTemplate from "@/models/EmailTemplate";

export async function GET() {
    await dbConnect();
    try {
        const templates = await EmailTemplate.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: templates });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const template = await EmailTemplate.create(body);
        return NextResponse.json({ success: true, data: template });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
        const updated = await EmailTemplate.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
        await EmailTemplate.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
