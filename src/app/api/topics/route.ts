import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Topic from "@/models/Topic";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const subject = searchParams.get("subject");
        const lessonId = searchParams.get("lessonId");

        let query: any = {};
        if (className) query.class = className;
        if (section) query.section = section;
        if (subject) query.subject = subject;
        if (lessonId) query.lesson = lessonId;

        const topics = await Topic.find(query).sort({ created_at: -1 }).lean();
        return apiResponse.success(topics);
    } catch (error: any) {
        console.error("API Error (Topics GET):", error);
        return apiResponse.error("Failed to retrieve topics", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json(); // Array of topics or single topic
        if (Array.isArray(body)) {
            const topics = await Topic.insertMany(body);
            return apiResponse.success(topics);
        } else {
            const topic = await Topic.create(body);
            return apiResponse.success(topic);
        }
    } catch (error: any) {
        console.error("API Error (Topics POST):", error);
        return apiResponse.error("Failed to save topic(s)", 500, error.message);
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return apiResponse.badRequest("ID required");
        await Topic.findByIdAndDelete(id);
        return apiResponse.success({ message: "Deleted successfully" });
    } catch (error: any) {
        console.error("API Error (Topics DELETE):", error);
        return apiResponse.error("Deletion failed", 500, error.message);
    }
}
