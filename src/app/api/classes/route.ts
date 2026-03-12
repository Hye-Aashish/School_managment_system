import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET() {
    await dbConnect();
    try {
        const classes = await Student.distinct("class");
        return NextResponse.json(classes);
    } catch (error) {
        console.error("API Error (Classes):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
