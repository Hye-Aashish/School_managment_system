import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import FeeMaster from "@/models/FeeMaster";
import FeePayment from "@/models/FeePayment";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const sectionName = searchParams.get("section");
        const searchTerm = searchParams.get("search");
        const feesGroup = searchParams.get("feesGroup");

        if (!className || !sectionName) {
            return NextResponse.json({ error: "Class and Section are required" }, { status: 400 });
        }

        const query: any = { class: className, section: sectionName };
        if (searchTerm) {
            query.$or = [
                { fname: { $regex: searchTerm, $options: "i" } },
                { lname: { $regex: searchTerm, $options: "i" } },
                { admission_no: { $regex: searchTerm, $options: "i" } }
            ];
        }

        const students = await Student.find(query);
        
        const results = await Promise.all(students.map(async (student) => {
            // Fetch assigned FeeMasters
            const masterQuery: any = {
                $or: [
                    { student: student._id },
                    { student: { $exists: false } }
                ]
            };
            
            // Fetch assigned masters
            let masters = await FeeMaster.find(masterQuery)
                .populate("fee_group")
                .populate("fee_type");

            // Filter by Fees Group if provided
            if (feesGroup && feesGroup !== "Select Fees Group") {
                masters = masters.filter(m => (m.fee_group as any)?.name === feesGroup);
            }

            // If filtering by group and no masters match, we'll return null to filter out
            if (feesGroup && feesGroup !== "Select Fees Group" && masters.length === 0) {
                return null;
            }

            // Fetch Payments
            const payments = await FeePayment.find({ student: student._id });

            let totalAmount = 0;
            let totalPaid = 0;
            let totalDiscount = 0; // Assuming 0 for now as it's not in schema
            let totalFine = 0;

            masters.forEach(m => {
                totalAmount += m.amount;
                // Basic fine calculation if needed, but for now let's just sum what's assigned
            });

            payments.forEach(p => {
                totalPaid += p.amount_paid;
                // If discount/fine were in payment, they'd be summed here
            });

            // Grouping names
            const feeGroups = masters.map(m => {
                const groupName = (m.fee_group as any)?.name || "N/A";
                const typeName = (m.fee_type as any)?.name || "N/A";
                return `${groupName} (${typeName})`;
            }).join(", ");

            return {
                _id: student._id,
                admission_no: student.admission_no,
                fname: student.fname,
                lname: student.lname,
                class: student.class,
                section: student.section,
                feeGroups,
                totalAmount,
                totalPaid,
                totalDiscount,
                totalFine,
                balance: totalAmount - totalPaid - totalDiscount + totalFine
            };
        }));

        return NextResponse.json(results.filter(r => r !== null));
    } catch (error: any) {
        console.error("FeeSearch API Error:", error);
        return NextResponse.json({ error: "Failed to fetch fee data" }, { status: 500 });
    }
}
