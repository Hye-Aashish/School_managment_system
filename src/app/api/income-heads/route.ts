import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import IncomeHead from "@/models/IncomeHead";

export async function GET() {
    await dbConnect();
    try {
        const incomeHeads = await IncomeHead.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: incomeHeads });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const newItem = await IncomeHead.create(body);
        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Income Head already exists" }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
