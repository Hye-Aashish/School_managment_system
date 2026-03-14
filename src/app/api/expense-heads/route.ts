import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ExpenseHead from "@/models/ExpenseHead";

export async function GET() {
    try {
        await dbConnect();
        const expenseHeads = await ExpenseHead.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: expenseHeads });
    } catch (error: any) {
        console.error("GET ExpenseHeads Error:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message || "Internal Server Error",
            details: error.toString()
        }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const newItem = await ExpenseHead.create(body);
        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Expense Head already exists" }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
