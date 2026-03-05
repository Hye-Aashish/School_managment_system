import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import StudentHouse from "@/models/StudentHouse";

export async function GET() {
    await dbConnect();
    try {
        const houses = await StudentHouse.find();
        return NextResponse.json(houses);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const newItem = await StudentHouse.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error: any) {
        console.error("Error creating student house:", error);
        if (error.code === 11000) {
            return NextResponse.json({ error: "House already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
