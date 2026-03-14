import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseObservationParameter from "@/models/CbseObservationParameter";

export async function GET() {
    try {
        await dbConnect();
        const params = await CbseObservationParameter.find({}).sort({ created_at: -1 });
        return NextResponse.json(params);
    } catch (error: any) {
        console.error("API Error (CBSE Observation Parameters GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const param = await CbseObservationParameter.create(body);
        return NextResponse.json(param, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Observation Parameters POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
