import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import StaffAttendance from "@/models/StaffAttendance";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");
        const staffId = searchParams.get("staffId");

        let query: any = {};
        if (date) query.date = date;
        if (staffId) query.staffId = staffId;

        const attendance = await StaffAttendance.find(query).lean();
        return NextResponse.json({ success: true, data: attendance });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json(); // Array of attendance records
        if (!Array.isArray(body)) return NextResponse.json({ success: false, error: "Array required" }, { status: 400 });

        const operations = body.map((record: any) => ({
            updateOne: {
                filter: { staffId: record.staffId, date: record.date },
                update: { $set: record },
                upsert: true
            }
        }));

        await StaffAttendance.bulkWrite(operations);
        return NextResponse.json({ success: true, message: "Attendance updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
