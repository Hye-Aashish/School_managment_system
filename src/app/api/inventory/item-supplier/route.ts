import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemSupplier from "@/models/ItemSupplier";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const suppliers = await ItemSupplier.find({ status: "Active" }).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: suppliers });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const supplier = await ItemSupplier.create(body);
        return NextResponse.json({ success: true, data: supplier });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
