import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseExam from "@/models/CbseExam";
import CbseTerm from "@/models/CbseTerm";
import CbseExamGrade from "@/models/CbseExamGrade";
import CbseAssessment from "@/models/CbseAssessment";
import Exam from "@/models/Exam";
import ExamGroup from "@/models/ExamGroup";

export async function GET() {
    try {
        await dbConnect();

        // Explicitly reference models to ensure they are registered with Mongoose and not tree-shaken
        const _registered = [CbseTerm, CbseExamGrade, CbseAssessment, ExamGroup];

        const exams = await CbseExam.find({})
            .populate("term", "name")
            .populate("examGrade", "name")
            .populate("assessment", "name")
            .sort({ created_at: -1 });

        const generalExams = await Exam.find({}).populate("examGroup").sort({ createdAt: -1 });
        const generalMapped = generalExams.map(ge => {
            const groupName = ge.examGroup && typeof ge.examGroup === 'object' && 'name' in ge.examGroup ? (ge.examGroup as any).name : 'General';
            return {
                _id: ge._id,
                name: `${ge.name} (${groupName})`,
                term: { _id: "general", name: "General" },
                examGrade: { _id: "general", name: "General" },
                assessment: { _id: "general", name: "General" },
                description: ge.description || "",
                isGeneral: true
            };
        });

        return NextResponse.json([...exams, ...generalMapped]);
    } catch (error: any) {
        console.error("API Error (CBSE Exams GET):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const exam = await CbseExam.create(body);

        // 🔔 Fire push notification to all students
        (async () => {
            try {
                const { sendNotificationToStudents } = await import("@/lib/fcm");
                const { default: Notification } = await import("@/models/Notification");

                const title = "📝 New CBSE Exam Scheduled";
                const message = `A new CBSE exam "${exam.name}" has been scheduled. Check your portal for details.`;
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
                console.error("Failed to send CBSE exam notification:", err);
            }
        })();

        return NextResponse.json(exam, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Exams POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
