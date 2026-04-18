import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { InventoryCategory, InventoryStore, InventorySupplier } from "@/models/InventoryLookups";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        
        let data;
        if (type === "category") data = await InventoryCategory.find({}).sort({ name: 1 }).lean();
        else if (type === "store") data = await InventoryStore.find({}).sort({ name: 1 }).lean();
        else if (type === "supplier") data = await InventorySupplier.find({}).sort({ name: 1 }).lean();
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { type, ...payload } = body;
        
        let data;
        if (type === "category") data = await InventoryCategory.create(payload);
        else if (type === "store") data = await InventoryStore.create(payload);
        else if (type === "supplier") data = await InventorySupplier.create(payload);
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const type = searchParams.get("type");

        if (type === "category") await InventoryCategory.findByIdAndDelete(id);
        else if (type === "store") await InventoryStore.findByIdAndDelete(id);
        else if (type === "supplier") await InventorySupplier.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
