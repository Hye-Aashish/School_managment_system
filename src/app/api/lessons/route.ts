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
        const lessons = Array.isArray(body)
            ? await Lesson.insertMany(body)
            : await Lesson.create(body);

        // 🔔 Fire push notification to affected class/section
        const isArray = Array.isArray(body);
        const sampleItem = isArray ? body[0] : body;
        if (sampleItem && sampleItem.class) {
            const targetClass = sampleItem.class;
            const targetSection = sampleItem.section;
            const subject = sampleItem.subject || "a subject";
            const lessonNamesStr = isArray
                ? body.map((l: any) => l.name).join(", ")
                : sampleItem.name;

            // Run in background so it doesn't block the API response
            (async () => {
                try {
                    const { sendNotificationToStudents } = await import("@/lib/fcm");
                    const { default: Notification } = await import("@/models/Notification");

                    const targetType = targetSection ? "section" : "class";
                    const title = "📖 New Lesson Added";
                    const message = `New lessons for ${subject} added: ${lessonNamesStr}`;
                    const route = "/lesson-plans";

                    const { tokens } = await sendNotificationToStudents({
                        targetType,
                        targetClass,
                        targetSection,
                        payload: {
                            title,
                            body: message,
                            data: {
                                type: "lesson_plan",
                                route,
                                title,
                                body: message,
                            },
                        },
                    });

                    await Notification.create({
                        title,
                        message,
                        type: "lesson_plan",
                        route,
                        targetType,
                        targetClass,
                        targetSection,
                        sentBy: "system",
                        recipientCount: tokens.length,
                        readBy: [],
                    });
                    console.log(`[Lesson Notification] Successfully sent and created for class: ${targetClass}, section: ${targetSection}`);
                } catch (err) {
                    console.error("Failed to send lesson notification:", err);
                }
            })();
        }

        return apiResponse.success(lessons);
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
