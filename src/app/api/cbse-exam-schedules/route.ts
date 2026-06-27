import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExamSchedule from "@/models/CbseExamSchedule";
import CbseExam from "@/models/CbseExam";
import Exam from "@/models/Exam";
import ExamSchedule from "@/models/ExamSchedule";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const examId = searchParams.get("examId");

        if (examId) {
            const isGeneralExam = await Exam.exists({ _id: examId });
            if (isGeneralExam) {
                const generalSchedules = await ExamSchedule.find({ exam: examId }).sort({ dateFrom: 1, startTime: 1 });
                const mapped = generalSchedules.map(gs => ({
                    _id: gs._id,
                    exam: { _id: examId, name: "General Exam" },
                    subject: gs.subject,
                    date: gs.dateFrom, // YYYY-MM-DD
                    time: gs.startTime,
                    roomNo: gs.roomNo || "000"
                }));
                return NextResponse.json(mapped);
            }
        }

        let query = {};
        if (examId) {
            query = { exam: examId };
        }

        const schedules = await CbseExamSchedule.find(query)
            .populate("exam", "name")
            .sort({ date: 1, time: 1 });
        return NextResponse.json(schedules);
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        if (!body.roomNo || body.roomNo.trim() === "") {
            body.roomNo = "000";
        }
        const schedule = await CbseExamSchedule.create(body);

        // 🔔 Fire push notification to all students in the background
        (async () => {
            try {
                const examObj = await CbseExam.findById(body.exam);
                const examName = examObj ? examObj.name : "CBSE Exam";

                const { sendNotificationToStudents } = await import("@/lib/fcm");
                const { default: Notification } = await import("@/models/Notification");

                const title = "📝 Exam Schedule Added";
                const message = `${examName}: Schedule for ${body.subject} has been added on ${body.date} ${body.time}.`;
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
                console.error("Failed to send CBSE exam schedule notification:", err);
            }
        })();

        return NextResponse.json(schedule, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Exam Schedules POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
