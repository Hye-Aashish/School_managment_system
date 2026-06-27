import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const className = searchParams.get("class");
    const section = searchParams.get("section");

    try {
        let query: any = {};
        if (date) query.date = date;
        if (className) query.class = className;
        if (section) query.section = section;

        const attendances = await Attendance.find(query).lean();
        return apiResponse.success(attendances);
    } catch (error: any) {
        console.error("API Error (Attendance GET):", error);
        return apiResponse.error("Attendance synchronization failure", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json(); // Array of attendance objects
        if (!Array.isArray(body)) {
            return NextResponse.json({ success: false, error: "Invalid data format" }, { status: 400 });
        }

        const operations = body.map((item: any) => ({
            updateOne: {
                filter: { student: item.student, date: item.date },
                update: { $set: item },
                upsert: true
            }
        }));

        await Attendance.bulkWrite(operations);

        // 🔔 Fire push notifications to affected students in the background
        if (body.length > 0) {
            (async () => {
                try {
                    const Student = require("@/models/Student").default;
                    const { sendToTokens } = await import("@/lib/fcm");
                    const { default: Notification } = await import("@/models/Notification");

                    const studentIds = body.map((item: any) => item.student);
                    const studentsObj = await Student.find({ _id: { $in: studentIds } });

                    for (const item of body) {
                        const studentObj = studentsObj.find((s: any) => s._id.toString() === item.student.toString());
                        if (studentObj) {
                            const tokens: string[] = [];
                            if (studentObj.fcm_tokens && Array.isArray(studentObj.fcm_tokens)) {
                                for (const t of studentObj.fcm_tokens) {
                                    if (t.token) tokens.push(t.token);
                                }
                            }

                            const statusStr = item.status;
                            const isNegative = statusStr === "Absent" || statusStr === "Half Day";
                            const emoji = isNegative ? "⚠️" : "✅";
                            const title = `${emoji} Attendance: ${statusStr}`;
                            const message = `You have been marked ${statusStr} for ${item.date}.`;
                            const route = "/attendance";

                            if (tokens.length > 0) {
                                await sendToTokens(tokens, {
                                    title,
                                    body: message,
                                    data: {
                                        type: "attendance",
                                        route,
                                        title,
                                        body: message,
                                    },
                                });
                            }

                            await Notification.create({
                                title,
                                message,
                                type: "attendance",
                                route,
                                targetType: "student",
                                targetAdmissionNo: studentObj.admission_no,
                                sentBy: "system",
                                recipientCount: tokens.length,
                                readBy: [],
                            });
                        }
                    }
                } catch (err) {
                    console.error("Failed to send attendance notifications:", err);
                }
            })();
        }

        return apiResponse.success({ message: "Attendance saved successfully" });
    } catch (error: any) {
        console.error("API Error (Attendance POST):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
