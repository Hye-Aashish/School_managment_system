import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import Timetable from "@/models/Timetable";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        let studentClass = searchParams.get("class");
        let section = searchParams.get("section");

        if (!studentClass || !section) {
            // 1. Authenticate user from session token
            let token = req.cookies.get("auth_token")?.value;
            if (!token) {
                const authHeader = req.headers.get("authorization");
                if (authHeader && authHeader.startsWith("Bearer ")) {
                    token = authHeader.substring(7);
                }
            }

            if (!token) {
                return apiResponse.error("Not authenticated", 401);
            }

            let sessionUser: any = null;
            try {
                sessionUser = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
            } catch (e) {
                return apiResponse.error("Invalid session", 401);
            }

            studentClass = sessionUser.class;
            section = sessionUser.section;
        }

        // 2. Fetch timetable from database
        let timetable = await Timetable.findOne({ className: studentClass, section }).lean();

        if (!timetable) {
            // Provide elegant fallback timetable if not found in database
            const fallbackPeriod = [
                { subject: "Mathematics", time: "08:00 AM - 08:45 AM", teacher: "Mr. Sharma", room: "Room 201" },
                { subject: "English", time: "08:50 AM - 09:35 AM", teacher: "Ms. Patel", room: "Room 105" },
                { subject: "Physics", time: "09:40 AM - 10:25 AM", teacher: "Dr. Verma", room: "Lab 1" },
                { subject: "Chemistry", time: "10:30 AM - 11:15 AM", teacher: "Ms. Nair", room: "Lab 2" },
                { subject: "Lunch Break", time: "11:20 AM - 12:00 PM", teacher: "—", room: "Cafeteria" },
                { subject: "History", time: "12:05 PM - 12:50 PM", teacher: "Mr. Khan", room: "Room 102" },
                { subject: "PE & Sports", time: "12:55 PM - 01:40 PM", teacher: "Coach Rao", room: "Playground" }
            ];

            timetable = {
                className: studentClass,
                section: section,
                monday: fallbackPeriod,
                tuesday: fallbackPeriod,
                wednesday: fallbackPeriod,
                thursday: fallbackPeriod,
                friday: fallbackPeriod,
                saturday: [
                    { subject: "Extracurricular Activities", time: "09:00 AM - 11:00 AM", teacher: "Ms. Singh", room: "Auditorium" }
                ],
                sunday: []
            } as any;
        }

        return apiResponse.success(timetable);

    } catch (error: any) {
        console.error("Timetable GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { className, section } = body;

        if (!className || !section) {
            return apiResponse.badRequest("className and section are required");
        }

        const timetable = await Timetable.findOneAndUpdate(
            { className, section },
            { $set: body },
            { new: true, upsert: true }
        );

        // 🔔 Fire push notification to all students of the target class/section
        (async () => {
            try {
                const { sendNotificationToStudents } = await import("@/lib/fcm");
                const { default: Notification } = await import("@/models/Notification");

                const title = "📅 Class Timetable Updated";
                const message = `The class timetable for ${className} (${section}) has been updated.`;
                const route = "/timetable";

                const { tokens } = await sendNotificationToStudents({
                    targetType: "section",
                    targetClass: className,
                    targetSection: section,
                    payload: {
                        title,
                        body: message,
                        data: {
                            type: "timetable",
                            route,
                            title,
                            body: message,
                        },
                    },
                });

                await Notification.create({
                    title,
                    message,
                    type: "timetable",
                    route,
                    targetType: "section",
                    targetClass: className,
                    targetSection: section,
                    sentBy: "system",
                    recipientCount: tokens.length,
                    readBy: [],
                });
            } catch (err) {
                console.error("Failed to send timetable notification:", err);
            }
        })();

        return apiResponse.success(timetable, 200);

    } catch (error: any) {
        console.error("Timetable POST Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const section = searchParams.get("section");

        if (!className || !section) {
            return apiResponse.badRequest("class and section are required");
        }

        await Timetable.findOneAndDelete({ className, section });
        return apiResponse.success({ message: "Timetable deleted successfully" });
    } catch (error: any) {
        console.error("Timetable DELETE Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
