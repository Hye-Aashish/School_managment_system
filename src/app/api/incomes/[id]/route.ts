import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Income from "@/models/Income";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    try {
        const { id } = await params;
        const body = await req.json();
        const updatedItem = await Income.findByIdAndUpdate(id, body, { new: true }).populate("incomeHead");
        if (!updatedItem) {
            return NextResponse.json({ success: false, error: "Income not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedItem });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    try {
        const { id } = await params;
        const deletedItem = await Income.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({ success: false, error: "Income not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Income deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
