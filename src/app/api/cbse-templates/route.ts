import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseTemplate from "@/models/CbseTemplate";

export async function GET() {
    try {
        await dbConnect();
        const templates = await CbseTemplate.find({}).sort({ created_at: -1 });
        return NextResponse.json(templates);
    } catch (error: any) {
        console.error("API Error (CBSE Templates GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const template = await CbseTemplate.create(body);
        return NextResponse.json(template, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Templates POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
