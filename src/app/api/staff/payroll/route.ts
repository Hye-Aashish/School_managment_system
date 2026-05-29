import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Payroll from "@/models/Payroll";
import Staff from "@/models/Staff";

// Get all payslips or filter by staff, month, year
export async function GET(req: NextRequest) {
    await dbConnect();
    // Ensure Staff model is registered (critical for Mongoose populate)
    if (!Staff) {
        console.log("Registering Staff model dynamically");
    }
    try {
        const { searchParams } = new URL(req.url);
        const month = searchParams.get("month");
        const year = searchParams.get("year");
        const staffId = searchParams.get("staffId");

        let query: any = {};
        if (month) query.month = month;
        if (year) query.year = year;
        if (staffId) query.staff = staffId;

        const payslips = await Payroll.find(query)
            .populate("staff")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ success: true, data: payslips });
    } catch (error) {
        console.error("Error fetching payroll data:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// Create/Generate new payroll record
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { staffId, month, year, basicSalary, allowance, deductions, netSalary, paymentMode, note } = body;

        if (!staffId || !month || !year || basicSalary === undefined || netSalary === undefined || !paymentMode) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Upsert style: if record exists for this staff, month, and year, update it; otherwise create it.
        const payslip = await Payroll.findOneAndUpdate(
            { staff: staffId, month, year },
            {
                staff: staffId,
                month,
                year,
                basicSalary,
                allowance,
                deductions,
                netSalary,
                paymentMode,
                note,
                status: "Generated"
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: payslip });
    } catch (error) {
        console.error("Error generating payslip:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
