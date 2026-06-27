import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemCategory from "@/models/ItemCategory";

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        const body = await req.json();
        const updated = await ItemCategory.findByIdAndUpdate(id, body, { new: true });
        if (!updated) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        const deleted = await ItemCategory.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
