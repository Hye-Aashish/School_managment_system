import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemStore from "@/models/ItemStore";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const stores = await ItemStore.find({ status: "Active" }).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: stores });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const existing = await ItemStore.findOne({ storeName: body.storeName });
        if (existing) {
            return NextResponse.json({ success: false, error: "Store name already exists" }, { status: 400 });
        }
        const store = await ItemStore.create(body);
        return NextResponse.json({ success: true, data: store });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
