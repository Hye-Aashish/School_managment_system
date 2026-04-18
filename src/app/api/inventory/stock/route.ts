import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { InventoryStock } from "@/models/InventoryTransactions";
import InventoryItem from "@/models/InventoryItem";

export async function GET() {
    await dbConnect();
    try {
        const stocks = await InventoryStock.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: stocks });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const stock = await InventoryStock.create(body);
        
        // Update Item Quantities
        await InventoryItem.findOneAndUpdate(
            { name: body.item },
            { $inc: { totalQty: body.qty, availableQty: body.qty } }
        );

        return NextResponse.json({ success: true, data: stock });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
