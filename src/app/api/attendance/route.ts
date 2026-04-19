import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const className = searchParams.get("class");
    const section = searchParams.get("section");

    try {
        let query: any = {};
        if (date) query.date = date;
        if (className) query.class = className;
        if (section) query.section = section;

        const attendances = await Attendance.find(query).lean();
        return apiResponse.success(attendances);
    } catch (error: any) {
        console.error("API Error (Attendance GET):", error);
        return apiResponse.error("Attendance synchronization failure", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json(); // Array of attendance objects
        if (!Array.isArray(body)) {
            return NextResponse.json({ success: false, error: "Invalid data format" }, { status: 400 });
        }

        const operations = body.map((item: any) => ({
            updateOne: {
                filter: { student: item.student, date: item.date },
                update: { $set: item },
                upsert: true
            }
        }));

        await Attendance.bulkWrite(operations);
        return apiResponse.success({ message: "Attendance saved successfully" });
    } catch (error: any) {
        console.error("API Error (Attendance POST):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
