import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const items = await Item.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: items });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const item = await Item.create(body);
        return NextResponse.json({ success: true, data: item });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
