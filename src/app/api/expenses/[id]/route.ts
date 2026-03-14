import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const updatedItem = await Expense.findByIdAndUpdate(id, body, { new: true }).populate("expenseHead");
        if (!updatedItem) {
            return NextResponse.json({ success: false, error: "Expense not found" }, { status: 404 });
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
        const deletedItem = await Expense.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({ success: false, error: "Expense not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Expense deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
