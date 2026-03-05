import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DisableReason from "@/models/DisableReason";

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
