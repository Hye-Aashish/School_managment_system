import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import ExpenseHead from "@/models/ExpenseHead"; // Ensure model is registered

export async function GET() {
    try {
        await dbConnect();
        const expenses = await Expense.find().populate("expenseHead").sort({ date: -1 });
        return NextResponse.json({ success: true, data: expenses });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const newItem = await Expense.create(body);
        const populatedItem = await Expense.findById(newItem._id).populate("expenseHead");
        return NextResponse.json({ success: true, data: populatedItem }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
