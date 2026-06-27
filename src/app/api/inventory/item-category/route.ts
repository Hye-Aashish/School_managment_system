import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemCategory from "@/models/ItemCategory";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const categories = await ItemCategory.find({ status: "Active" }).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const existing = await ItemCategory.findOne({ name: body.name });
        if (existing) {
            return NextResponse.json({ success: false, error: "Category name already exists" }, { status: 400 });
        }
        const category = await ItemCategory.create(body);
        return NextResponse.json({ success: true, data: category });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
