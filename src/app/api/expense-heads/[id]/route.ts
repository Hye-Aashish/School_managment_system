import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ExpenseHead from "@/models/ExpenseHead";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const updatedItem = await ExpenseHead.findByIdAndUpdate(id, body, { new: true });
        if (!updatedItem) {
            return NextResponse.json({ success: false, error: "Expense Head not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedItem });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedItem = await ExpenseHead.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({ success: false, error: "Expense Head not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Expense Head deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
