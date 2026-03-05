import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { ids } = await req.json();
        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
        }

        await Student.deleteMany({ admission_no: { $in: ids } });
        return NextResponse.json({ message: "Students deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
