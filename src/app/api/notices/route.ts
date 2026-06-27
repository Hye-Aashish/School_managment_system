import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";

export async function GET() {
    await dbConnect();
    try {
        const notices = await Notice.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: notices });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const notice = await Notice.create(body);

        // 🔔 Notify all students about new notice
        const title = "📢 New Notice Posted";
        const message = body.title || body.notice_title || "A new notice has been posted. Please check the notice board.";
        const route = "/notice-board";
        import("@/lib/fcm").then(({ sendNotificationToStudents }) => {
            import("@/models/Notification").then(({ default: Notification }) => {
                sendNotificationToStudents({
                    targetType: "all",
                    payload: { title, body: message, data: { type: "notice", route, title, body: message } },
                }).then(({ tokens }) => {
                    Notification.create({ title, message, type: "notice", route, targetType: "all", sentBy: "system", recipientCount: tokens.length, readBy: [] }).catch(console.error);
                }).catch(console.error);
            });
        }).catch(console.error);

        return NextResponse.json({ success: true, data: notice });
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
        await Notice.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
