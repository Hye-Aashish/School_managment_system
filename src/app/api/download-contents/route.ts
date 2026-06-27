import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import DownloadContent from "@/models/DownloadContent";

export async function GET() {
    await dbConnect();
    try {
        const contents = await DownloadContent.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: contents });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const content = await DownloadContent.create(body);

        // 🔔 Notify all students about new download
        const title = "⬇️ New Download Available";
        const message = `New content "${body.title || "material"}" is available in the Download Center.`;
        const route = "/downloads";
        import("@/lib/fcm").then(({ sendNotificationToStudents }) => {
            import("@/models/Notification").then(({ default: Notification }) => {
                sendNotificationToStudents({
                    targetType: "all",
                    payload: { title, body: message, data: { type: "download", route, title, body: message } },
                }).then(({ tokens }) => {
                    Notification.create({ title, message, type: "download", route, targetType: "all", sentBy: "system", recipientCount: tokens.length, readBy: [] }).catch(console.error);
                }).catch(console.error);
            });
        }).catch(console.error);

        return NextResponse.json({ success: true, data: content });
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
        await DownloadContent.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
