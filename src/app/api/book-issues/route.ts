import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import BookIssue from "@/models/BookIssue";
import Book from "@/models/Book";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const memberId = searchParams.get("memberId");
        
        let query: any = {};
        if (memberId) query.memberId = memberId;

        const issues = await BookIssue.find(query).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: issues });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const book = await Book.findOne({ bookNo: body.bookId });
        
        if (!book || book.availableQty <= 0) {
            return NextResponse.json({ success: false, error: "Book unavailable or not found" }, { status: 400 });
        }

        const issue = await BookIssue.create(body);
        
        // Decrement available qty
        await Book.findByIdAndUpdate(book._id, { $inc: { availableQty: -1 } });
        
        return NextResponse.json({ success: true, data: issue });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { id, actualReturnDate } = await req.json();
        const issue = await BookIssue.findById(id);
        if (!issue || issue.status === "Returned") return NextResponse.json({ success: false, error: "Invalid issue record" });

        const updatedIssue = await BookIssue.findByIdAndUpdate(id, { 
            status: "Returned", 
            actualReturnDate 
        }, { new: true });

        // Increment available qty
        const book = await Book.findOne({ bookNo: issue.bookId });
        if (book) {
            await Book.findByIdAndUpdate(book._id, { $inc: { availableQty: 1 } });
        }

        return NextResponse.json({ success: true, data: updatedIssue });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
