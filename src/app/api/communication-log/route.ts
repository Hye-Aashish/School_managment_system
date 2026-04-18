import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CommunicationLog from "@/models/CommunicationLog";

export async function GET() {
    await dbConnect();
    try {
        const logs = await CommunicationLog.find({}).sort({ sent_at: -1 }).lean();
        return NextResponse.json({ success: true, data: logs });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const log = await CommunicationLog.create(body);
        return NextResponse.json({ success: true, data: log });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
