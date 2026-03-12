import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FeeGroup from "@/models/FeeGroup";
import FeeType from "@/models/FeeType";
import FeeMaster from "@/models/FeeMaster";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { studentId, installments } = await req.json();

        if (!studentId || !installments || !installments.every((i: any) => i.amount > 0)) {
            return NextResponse.json({ error: "Invalid installment data" }, { status: 400 });
        }

        const savedMasters = [];

        for (const inst of installments) {
            // 1. Get or Create Fee Group
            let group = await FeeGroup.findOne({ name: inst.group });
            if (!group) {
                group = await FeeGroup.create({ name: inst.group, description: "Student specific group" });
            }

            // 2. Get or Create Fee Type
            let type = await FeeType.findOne({ fees_code: inst.code });
            if (!type) {
                type = await FeeType.create({ 
                    name: inst.type, 
                    fees_code: inst.code, 
                    description: "Student specific installment" 
                });
            }

            // 3. Create Fee Master
            const master = await FeeMaster.create({
                student: studentId,
                fee_group: group._id,
                fee_type: type._id,
                due_date: inst.dueDate,
                amount: inst.amount,
                fine_type: inst.fineType || "none",
                fine_amount: inst.fine || 0
            });
            savedMasters.push(master);
        }

        return NextResponse.json({ message: "Installments saved successfully", count: savedMasters.length });
    } catch (error: any) {
        console.error("Bulk Assign Error:", error);
        return NextResponse.json({ error: error.message || "Failed to save installments" }, { status: 500 });
    }
}
