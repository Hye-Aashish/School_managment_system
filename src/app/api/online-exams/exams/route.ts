import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OnlineExam from "@/models/OnlineExam";
import "@/models/OnlineQuestion"; // Ensure model is registered for populate

export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status"); // upcoming, closed

        const query: any = {};
        const now = new Date();

        if (status === "upcoming") {
            query.exam_to = { $gte: now };
        } else if (status === "closed") {
            query.exam_to = { $lt: now };
        }

        const exams = await OnlineExam.find(query).populate("questions").sort({ exam_from: 1 });
        return NextResponse.json({ success: true, data: exams });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch exams" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const exam = await OnlineExam.create(body);

        // 🔔 Fire push notification
        const targetClass = body.class || body.className;
        const targetSection = body.section;
        const title = "📝 New Online Exam Scheduled";
        const message = `${body.title || "A new exam"} is scheduled. Check the Online Exams section.`;
        const route = "/exams";

        import("@/lib/fcm").then(({ sendNotificationToStudents }) => {
            import("@/models/Notification").then(({ default: Notification }) => {
                const targetType = targetSection ? "section" : (targetClass ? "class" : "all");
                sendNotificationToStudents({
                    targetType,
                    targetClass,
                    targetSection,
                    payload: { title, body: message, data: { type: "exam", route, title, body: message } },
                }).then(({ tokens }) => {
                    Notification.create({
                        title, message, type: "exam", route,
                        targetType, targetClass, targetSection,
                        sentBy: "system", recipientCount: tokens.length, readBy: [],
                    }).catch(console.error);
                }).catch(console.error);
            });
        }).catch(console.error);

        return NextResponse.json({ success: true, data: exam });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        const body = await request.json();
        const exam = await OnlineExam.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ success: true, data: exam });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        await OnlineExam.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete exam" }, { status: 500 });
    }
}
