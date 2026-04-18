import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const search = searchParams.get("search");

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "100");
        const skip = (page - 1) * limit;

        let query: any = {};
        if (status) query.status = status;
        if (className) query.class = className;
        if (section) query.section = section;
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

        return apiResponse.success({
            students,
            totalEntries,
            totalPages: Math.ceil(totalEntries / limit),
            currentPage: page
        });
    } catch (error: any) {
        console.error("Critical API Error (Students GET):", error);
        return apiResponse.error("Failed to retrieve student records", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        if (!body.fname || !body.class) {
            return apiResponse.badRequest("Missing required student fields (fname, class)");
        }

        const newStudent = await Student.create({
            ...body,
            admission_no: body.admission_no || `ADM${Date.now()}`,
            status: body.status || "Active"
        });

        return apiResponse.success(newStudent, 201);
    } catch (error: any) {
        if (error.code === 11000) {
            return apiResponse.error("Admission number already exists in the system", 400);
        }
        console.error("Critical API Error (Students POST):", error);
        return apiResponse.error("Failed to create student record", 500, error.message);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!Array.isArray(body)) {
            return apiResponse.badRequest("Bulk update expects an array of records");
        }

        const updatePromises = body.map((item: any) => {
            if (!item.id) throw new Error("Missing ID in bulk update record");
            return Student.findByIdAndUpdate(item.id, { ...item }, { new: true });
        });

        await Promise.all(updatePromises);
        return apiResponse.success({ message: "Bulk update completed successfully" });
    } catch (error: any) {
        console.error("Critical API Error (Students PUT):", error);
        return apiResponse.error("Bulk update operation failed", 500, error.message);
    }
}
