import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const className = searchParams.get("class");
    const section = searchParams.get("section");
    const search = searchParams.get("search");

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    try {
        let query: any = {};
        if (status) {
            query.status = status;
        }
        if (className) {
            query.class = className;
        }
        if (section) {
            query.section = section;
        }
        if (search) {
            const searchRegex = { $regex: search, $options: "i" };
            query.$or = [
                { fname: searchRegex },
                { lname: searchRegex },
                { admission_no: searchRegex }
            ];
        }

        const [students, totalEntries] = await Promise.all([
            Student.find(query).sort({ created_at: -1 }).skip(skip).limit(limit).lean(),
            Student.countDocuments(query)
        ]);

        return NextResponse.json({
            data: students,
            totalEntries,
            totalPages: Math.ceil(totalEntries / limit),
            currentPage: page
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const newStudent = await Student.create({
            ...body,
            admission_no: body.admission_no || `ADM${Date.now()}`,
            status: "Active"
        });
        return NextResponse.json(newStudent, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Admission number already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
