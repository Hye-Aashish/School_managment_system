import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Income from "@/models/Income";
import Expense from "@/models/Expense";

export async function GET() {
    await dbConnect();
    try {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentYear = new Date().getFullYear();

        const incomes = await Income.find({
            date: {
                $gte: new Date(`${currentYear}-01-01`),
                $lte: new Date(`${currentYear}-12-31`)
            }
        });

        const expenses = await Expense.find({
            date: {
                $gte: new Date(`${currentYear}-01-01`),
                $lte: new Date(`${currentYear}-12-31`)
            }
        });

        const incomeData = new Array(12).fill(0);
        const expenseData = new Array(12).fill(0);

        incomes.forEach(inc => {
            const m = new Date(inc.date).getMonth();
            incomeData[m] += inc.amount;
        });

        expenses.forEach(exp => {
            const m = new Date(exp.date).getMonth();
            expenseData[m] += exp.amount;
        });

        return NextResponse.json({
            labels: months,
            income: incomeData,
            expense: expenseData
        });
    } catch (error) {
        console.error("API Error (Monthly Stats):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
