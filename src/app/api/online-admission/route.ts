import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import OnlineAdmission from "@/models/OnlineAdmission";

export async function GET() {
    await dbConnect();
    try {
        const admissions = await OnlineAdmission.find().sort({ created_at: -1 });
        return NextResponse.json(admissions);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const newAdmission = await OnlineAdmission.create({
            ...body,
            reference_no: body.reference_no || `REF${Date.now()}`
        });
        return NextResponse.json(newAdmission, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Reference number already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
