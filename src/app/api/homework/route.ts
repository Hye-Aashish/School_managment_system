import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Homework from "@/models/Homework";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const sectionName = searchParams.get("section");
        const subjectName = searchParams.get("subject");

        let query: any = {};
        if (className) query.class = className;
        if (sectionName) query.section = sectionName;
        if (subjectName) query.subject = subjectName;

        const homeworks = await Homework.find(query).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: homeworks });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const homework = await Homework.create(body);

        // 🔔 Fire push notification to affected class/section
        const targetClass = body.class || body.className;
        const targetSection = body.section;
        const subject = body.subject || "a subject";

        if (targetClass) {
            import("@/lib/fcm").then(({ sendNotificationToStudents }) => {
                import("@/models/Notification").then(({ default: Notification }) => {
                    const targetType = targetSection ? "section" : "class";
                    const title = "📚 New Homework Added";
                    const message = `New homework for ${subject} is due on ${body.submissionDate || "upcoming date"}.`;
                    const route = "/homework";

                    sendNotificationToStudents({
                        targetType,
                        targetClass,
                        targetSection,
                        payload: { title, body: message, data: { type: "homework", route, title, body: message } },
                    }).then(({ tokens, result }) => {
                        Notification.create({
                            title, message, type: "homework", route,
                            targetType, targetClass, targetSection,
                            sentBy: "system", recipientCount: tokens.length, readBy: [],
                        }).catch(console.error);
                    }).catch(console.error);
                });
            }).catch(console.error);
        }

        return NextResponse.json({ success: true, data: homework });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
        await Homework.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
