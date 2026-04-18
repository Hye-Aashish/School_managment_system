import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import AnnualCalendar from "@/models/AnnualCalendar";

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    try {
        let query: any = {};
        if (type) query.type = type;

        const events = await AnnualCalendar.find(query).sort({ fromDate: 1 }).lean();
        return NextResponse.json({ success: true, data: events });
    } catch (error) {
        console.error("API Error (AnnualCalendar GET):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const newEvent = await AnnualCalendar.create(body);
        return NextResponse.json({ success: true, data: newEvent });
    } catch (error) {
        console.error("API Error (AnnualCalendar POST):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        await AnnualCalendar.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
