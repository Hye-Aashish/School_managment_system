import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import { apiResponse } from "@/lib/response";

export async function GET() {
    try {
        await dbConnect();
        
        // Optimized query with projection to fetch only necessary fields
        const recentStudents = await Student.find({})
            .sort({ created_at: -1 })
            .limit(10)
            .select("admission_no fname lname class section father_name admission_date created_at")
            .lean();

        return apiResponse.success(recentStudents);
    } catch (error: any) {
        console.error("Performance Error (Recent Students):", error);
        return apiResponse.error("Failed to stream recent admission hooks", 500, error.message);
    }
}
