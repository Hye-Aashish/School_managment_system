import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import { SECTIONS } from "@/constants/student-constants";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const className = searchParams.get("class");

        const query: any = {};
        if (className) query.class = className;

        const studentSections = await Student.distinct("section", query);
        
        // Merge with predefined sections
        const allSections = Array.from(new Set([...SECTIONS, ...studentSections])).sort();

        return NextResponse.json(allSections);
    } catch (error) {
        console.error("Error fetching sections:", error);
        return NextResponse.json({ error: "Failed to fetch sections" }, { status: 500 });
    }
}
