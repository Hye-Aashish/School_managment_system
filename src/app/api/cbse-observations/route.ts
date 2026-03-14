import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseObservation from "@/models/CbseObservation";
import CbseObservationParameter from "@/models/CbseObservationParameter";

export async function GET() {
    try {
        await dbConnect();
        const observations = await CbseObservation.find({})
            .populate("parameters.parameter", "name")
            .sort({ created_at: -1 });
        return NextResponse.json(observations);
    } catch (error: any) {
        console.error("API Error (CBSE Observations GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const observation = await CbseObservation.create(body);
        return NextResponse.json(observation, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Observations POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
