import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const className = searchParams.get("class");

    try {
        let query: any = {};
        if (className) {
            query.class = className;
        }
        const sections = await Student.distinct("section", query);
        return NextResponse.json(sections);
    } catch (error) {
        console.error("API Error (Sections):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
