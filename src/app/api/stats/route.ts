import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import OnlineAdmission from "@/models/OnlineAdmission";
import Income from "@/models/Income";
import Expense from "@/models/Expense";
import AnnualCalendar from "@/models/AnnualCalendar";
import { apiResponse } from "@/lib/response";

export async function GET() {
    try {
        await dbConnect();
        
        // Execute optimized aggregation and count queries in parallel
        const [
            totalStudents,
            activeStudents,
            disabledStudents,
            onlineAdmissions,
            upcomingEvents,
            incomeAggregate,
            expenseAggregate
        ] = await Promise.all([
            Student.countDocuments({}),
            Student.countDocuments({ status: "Active" }),
            Student.countDocuments({ status: "Disabled" }),
            OnlineAdmission.countDocuments({}),
            AnnualCalendar.countDocuments({ fromDate: { $gte: new Date().toISOString().split('T')[0] } }),
            // Sum amounts directly in DB instead of fetching all docs
            Income.aggregate([
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            Expense.aggregate([
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ])
        ]);

        const totalIncome = incomeAggregate[0]?.total || 0;
        const totalExpense = expenseAggregate[0]?.total || 0;

        return apiResponse.success({
            totalStudents,
            activeStudents,
            disabledStudents,
            onlineAdmissions,
            upcomingEvents,
            totalIncome,
            totalExpense,
            netProfit: totalIncome - totalExpense
        });
    } catch (error: any) {
        console.error("Critical Performance Error (Stats):", error);
        return apiResponse.error("System metrics synchronization timed out", 500, error.message);
    }
}
