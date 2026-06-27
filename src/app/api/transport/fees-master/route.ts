import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import TransportFeeMaster from "@/models/TransportFeeMaster";

const defaultMonthsData = [
    { month: "January", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "February", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "March", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "April", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "May", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "June", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "July", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "August", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "September", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "October", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "November", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
    { month: "December", dueDate: "", fineType: "None", feeType: "Percentage", feeValue: "", fixAmount: "" },
];

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        let feeMaster = await TransportFeeMaster.findOne({});
        if (!feeMaster) {
            feeMaster = await TransportFeeMaster.create({ monthsData: defaultMonthsData });
        }
        return NextResponse.json({ success: true, data: feeMaster });
    } catch (error) {
        console.error("GET TransportFeeMaster error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { monthsData } = body;
        
        if (!monthsData || !Array.isArray(monthsData)) {
            return NextResponse.json({ success: false, error: "Invalid data format" }, { status: 400 });
        }

        let feeMaster = await TransportFeeMaster.findOne({});
        if (feeMaster) {
            feeMaster.monthsData = monthsData;
            feeMaster.updated_at = new Date();
            await feeMaster.save();
        } else {
            feeMaster = await TransportFeeMaster.create({ monthsData });
        }

        return NextResponse.json({ success: true, data: feeMaster });
    } catch (error) {
        console.error("POST TransportFeeMaster error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
