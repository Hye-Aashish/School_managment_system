import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseTerm from "@/models/CbseTerm";

export async function GET() {
    try {
        await dbConnect();
        const terms = await CbseTerm.find({}).sort({ created_at: -1 });
        return NextResponse.json(terms);
    } catch (error: any) {
        console.error("API Error (CBSE Terms GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const term = await CbseTerm.create(body);
        return NextResponse.json(term, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Terms POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
