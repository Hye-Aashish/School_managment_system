import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseAssignObservation from "@/models/CbseAssignObservation";
import CbseObservation from "@/models/CbseObservation";
import CbseTerm from "@/models/CbseTerm";

export async function GET() {
    try {
        await dbConnect();
        const assignments = await CbseAssignObservation.find({})
            .populate("observation", "name")
            .populate("term", "name")
            .sort({ created_at: -1 });
        return NextResponse.json(assignments);
    } catch (error: any) {
        console.error("API Error (CBSE Assign Observations GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const assignment = await CbseAssignObservation.create(body);
        return NextResponse.json(assignment, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Assign Observations POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
