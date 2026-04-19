import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Lesson from "@/models/Lesson";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const subject = searchParams.get("subject");

        let query: any = {};
        if (className) query.class = className;
        if (section) query.section = section;
        if (subject) query.subject = subject;

        const lessons = await Lesson.find(query).sort({ created_at: -1 }).lean();
        return apiResponse.success(lessons);
    } catch (error: any) {
        console.error("API Error (Lessons GET):", error);
        return apiResponse.error("Failed to retrieve lessons", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json(); // Array of lessons or single lesson
        if (Array.isArray(body)) {
            const lessons = await Lesson.insertMany(body);
            return apiResponse.success(lessons);
        } else {
            const lesson = await Lesson.create(body);
            return apiResponse.success(lesson);
        }
    } catch (error: any) {
        console.error("API Error (Lessons POST):", error);
        return apiResponse.error("Failed to save lesson(s)", 500, error.message);
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return apiResponse.badRequest("ID required");
        await Lesson.findByIdAndDelete(id);
        return apiResponse.success({ message: "Deleted successfully" });
    } catch (error: any) {
        console.error("API Error (Lessons DELETE):", error);
        return apiResponse.error("Deletion failed", 500, error.message);
    }
}
