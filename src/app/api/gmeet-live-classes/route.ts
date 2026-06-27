import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GmeetLiveClass from "@/models/GmeetLiveClass";

export async function GET() {
  try {
    await dbConnect();
    const liveClasses = await GmeetLiveClass.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: liveClasses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newLiveClass = await GmeetLiveClass.create(body);

    // 🔔 Notify all students about new live class
    const classTitle = body.classTitle || body.title || "a new class";
    const title = "🎥 Live Class Scheduled";
    const message = `"${classTitle}" live class has been scheduled. Join on time!`;
    const route = "/live-classes";
    import("@/lib/fcm").then(({ sendNotificationToStudents }) => {
        import("@/models/Notification").then(({ default: Notification }) => {
            sendNotificationToStudents({
                targetType: "all",
                payload: { title, body: message, data: { type: "live_class", route, title, body: message } },
            }).then(({ tokens }) => {
                Notification.create({ title, message, type: "live_class", route, targetType: "all", sentBy: "system", recipientCount: tokens.length, readBy: [] }).catch(console.error);
            }).catch(console.error);
        });
    }).catch(console.error);

    return NextResponse.json({ success: true, data: newLiveClass }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
