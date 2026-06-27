import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExamSchedule from "@/models/CbseExamSchedule";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        if (body.roomNo !== undefined && (!body.roomNo || body.roomNo.trim() === "")) {
            body.roomNo = "000";
        }
        const schedule = await CbseExamSchedule.findByIdAndUpdate(id, body, { new: true });
        if (!schedule) {
            return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
        }

        // 🔔 Fire push notification to all students in the background
        (async () => {
            try {
                const CbseExam = require("@/models/CbseExam").default;
                const examObj = await CbseExam.findById(schedule.exam);
                const examName = examObj ? examObj.name : "CBSE Exam";

                const { sendNotificationToStudents } = await import("@/lib/fcm");
                const { default: Notification } = await import("@/models/Notification");

                const title = "📝 Exam Schedule Updated";
                const message = `${examName}: Schedule for ${schedule.subject} has been updated to ${schedule.date} ${schedule.time}.`;
                const route = "/cbse-exam";

                const { tokens } = await sendNotificationToStudents({
                    targetType: "all",
                    payload: {
                        title,
                        body: message,
                        data: {
                            type: "cbse_exam",
                            route,
                            title,
                            body: message,
                        },
                    },
                });

                await Notification.create({
                    title,
                    message,
                    type: "cbse_exam",
                    route,
                    targetType: "all",
                    sentBy: "system",
                    recipientCount: tokens.length,
                    readBy: [],
                });
            } catch (err) {
                console.error("Failed to send CBSE exam schedule update notification:", err);
            }
        })();

        return NextResponse.json(schedule);
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules PUT):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const schedule = await CbseExamSchedule.findByIdAndDelete(id);
        if (!schedule) {
            return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Schedule deleted successfully" });
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules DELETE):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
