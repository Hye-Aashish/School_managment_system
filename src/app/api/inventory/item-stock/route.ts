import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemStock from "@/models/ItemStock";
import Item from "@/models/Item";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const stocks = await ItemStock.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: stocks });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const stock = await ItemStock.create(body);
        
        // Update Item quantities
        await Item.findOneAndUpdate(
            { name: stock.item },
            { $inc: { totalQty: stock.qty, availableQty: stock.qty } }
        );

        return NextResponse.json({ success: true, data: stock });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
