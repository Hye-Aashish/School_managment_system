import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DisableReason from "@/models/DisableReason";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await req.json();
        const updated = await DisableReason.findOneAndUpdate(
            { reason: decodeURIComponent(id) },
            body,
            { new: true }
        );
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Reason already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const { id } = await params;
    try {
        const deleted = await DisableReason.findOneAndDelete({ reason: decodeURIComponent(id) });
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Disable reason deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
