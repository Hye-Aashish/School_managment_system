import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import LessonPlan from "@/models/LessonPlan";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const date = searchParams.get("date");
        const subject = searchParams.get("subject");

        let query: any = {};
        if (className) query.class = className;
        if (section) query.section = section;
        if (date) query.date = date;
        if (subject) query.subject = subject;

        const plans = await LessonPlan.find(query).sort({ timeFrom: 1 }).lean();
        return NextResponse.json({ success: true, data: plans });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        if (body.group && !body.subjectGroup) {
            body.subjectGroup = body.group;
        }
        const plan = await LessonPlan.create(body);

        // 🔔 Notify class/section about new lesson plan
        const targetClass = body.class || body.className;
        const targetSection = body.section;
        const subject = body.subject || "a subject";
        if (targetClass) {
            import("@/lib/fcm").then(({ sendNotificationToStudents }) => {
                import("@/models/Notification").then(({ default: Notification }) => {
                    const targetType = targetSection ? "section" : "class";
                    const title = "📖 Lesson Plan Updated";
                    const message = `A new lesson plan for ${subject} has been added.`;
                    const route = "/lesson-plans";
                    sendNotificationToStudents({
                        targetType, targetClass, targetSection,
                        payload: { title, body: message, data: { type: "lesson_plan", route, title, body: message } },
                    }).then(({ tokens }) => {
                        Notification.create({ title, message, type: "lesson_plan", route, targetType, targetClass, targetSection, sentBy: "system", recipientCount: tokens.length, readBy: [] }).catch(console.error);
                    }).catch(console.error);
                });
            }).catch(console.error);
        }

        return NextResponse.json({ success: true, data: plan });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        if (updateData.group && !updateData.subjectGroup) {
            updateData.subjectGroup = updateData.group;
        }
        const updated = await LessonPlan.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json({ success: true, data: updated });
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
        await LessonPlan.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
