import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import FeeMaster from "@/models/FeeMaster";
import FeePayment from "@/models/FeePayment";
import FeeDiscount from "@/models/FeeDiscount";
import FeeGroup from "@/models/FeeGroup";
import FeeType from "@/models/FeeType";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await params;
        const studentId = id;

        // Fetch student details
        const student = await Student.findById(studentId);
        if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

        // Fetch assigned Fees (Including student-specific assignments)
        const allMasters = await FeeMaster.find({ 
            $or: [
                { student: studentId },
                { student: { $exists: false } } // For class-wide fees if needed
            ]
        })
            .populate("fee_group")
            .populate("fee_type");

        // Fetch payments made by this student
        const payments = await FeePayment.find({ student: studentId });

        // Fetch available discounts
        const discounts = await FeeDiscount.find();
        
        return NextResponse.json({
            student,
            masters: allMasters,
            payments,
            discounts
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch student fee status" }, { status: 500 });
    }
}
