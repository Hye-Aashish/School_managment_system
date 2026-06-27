import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemStock from "@/models/ItemStock";
import Item from "@/models/Item";

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        const stock = await ItemStock.findById(id);
        
        if (!stock) {
            return NextResponse.json({ success: false, error: "Stock not found" }, { status: 404 });
        }

        // Revert Item quantities
        await Item.findOneAndUpdate(
            { name: stock.item },
            { $inc: { totalQty: -stock.qty, availableQty: -stock.qty } }
        );

        await ItemStock.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
