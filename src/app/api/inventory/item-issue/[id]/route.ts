import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import ItemIssue from "@/models/ItemIssue";
import Item from "@/models/Item";

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        const body = await req.json();
        
        const issue = await ItemIssue.findById(id);
        if (!issue) {
            return NextResponse.json({ success: false, error: "Issue not found" }, { status: 404 });
        }
        
        if (issue.status === "Returned") {
            return NextResponse.json({ success: false, error: "Already returned" }, { status: 400 });
        }

        const updated = await ItemIssue.findByIdAndUpdate(id, {
            status: "Returned",
            returnDate: body.returnDate
        }, { new: true });

        // Increment Item available quantity back
        await Item.findOneAndUpdate(
            { name: issue.item },
            { $inc: { availableQty: issue.qty } }
        );

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
