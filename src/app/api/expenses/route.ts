import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import ExpenseHead from "@/models/ExpenseHead";
import { apiResponse } from "@/lib/response";

export async function GET() {
    try {
        await dbConnect();
        const expenses = await Expense.find().populate("expenseHead").sort({ date: -1 });
        return apiResponse.success(expenses);
    } catch (error: any) {
        console.error("API Error (Expenses GET):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const newItem = await Expense.create(body);
        const populatedItem = await Expense.findById(newItem._id).populate("expenseHead");
        return apiResponse.success(populatedItem, 201);
    } catch (error: any) {
        console.error("API Error (Expenses POST):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
