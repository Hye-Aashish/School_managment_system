import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemIssue from "@/models/ItemIssue";
import Item from "@/models/Item";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const issues = await ItemIssue.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: issues });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        
        // Verify available quantity
        const itemObj = await Item.findOne({ name: body.item });
        if (!itemObj) {
            return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
        }
        if (itemObj.availableQty < body.qty) {
            return NextResponse.json({ success: false, error: "Insufficient available quantity" }, { status: 400 });
        }

        const issue = await ItemIssue.create(body);
        
        // Decrement Item available quantity
        await Item.findOneAndUpdate(
            { name: issue.item },
            { $inc: { availableQty: -issue.qty } }
        );

        return NextResponse.json({ success: true, data: issue });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
