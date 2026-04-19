import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Income from "@/models/Income";
import IncomeHead from "@/models/IncomeHead";
import { apiResponse } from "@/lib/response";

export async function GET() {
    await dbConnect();
    try {
        const incomes = await Income.find().populate("incomeHead").sort({ date: -1 });
        return apiResponse.success(incomes);
    } catch (error: any) {
        console.error("API Error (Incomes GET):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const newItem = await Income.create(body);
        const populatedItem = await Income.findById(newItem._id).populate("incomeHead");
        return apiResponse.success(populatedItem, 201);
    } catch (error: any) {
        console.error("API Error (Incomes POST):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
