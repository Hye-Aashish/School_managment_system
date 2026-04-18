import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { InventoryIssue } from "@/models/InventoryTransactions";
import InventoryItem from "@/models/InventoryItem";

export async function GET() {
    await dbConnect();
    try {
        const issues = await InventoryIssue.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: issues });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const item = await InventoryItem.findOne({ name: body.item });
        
        if (!item || item.availableQty < body.qty) {
            return NextResponse.json({ success: false, error: "Insufficient stock or item not found" }, { status: 400 });
        }

        const issue = await InventoryIssue.create(body);
        
        // Decrement available qty
        await InventoryItem.findByIdAndUpdate(item._id, { $inc: { availableQty: -body.qty } });
        
        return NextResponse.json({ success: true, data: issue });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { id, returnDate } = await req.json();
        const issue = await InventoryIssue.findById(id);
        if (!issue || issue.status === "Returned") return NextResponse.json({ success: false, error: "Invalid issue record" });

        const updatedIssue = await InventoryIssue.findByIdAndUpdate(id, { 
            status: "Returned", 
            returnDate 
        }, { new: true });

        // Increment available qty
        await InventoryItem.findOneAndUpdate(
            { name: issue.item },
            { $inc: { availableQty: issue.qty } }
        );

        return NextResponse.json({ success: true, data: updatedIssue });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
