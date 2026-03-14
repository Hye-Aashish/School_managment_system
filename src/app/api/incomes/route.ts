import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Income from "@/models/Income";
import IncomeHead from "@/models/IncomeHead"; // Ensure model is registered

export async function GET() {
    await dbConnect();
    try {
        const incomes = await Income.find().populate("incomeHead").sort({ date: -1 });
        return NextResponse.json({ success: true, data: incomes });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const newItem = await Income.create(body);
        const populatedItem = await Income.findById(newItem._id).populate("incomeHead");
        return NextResponse.json({ success: true, data: populatedItem }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
