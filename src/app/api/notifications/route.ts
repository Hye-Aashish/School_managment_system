import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { sendNotificationToStudents } from "@/lib/fcm";

/** Decode Bearer token to get student info */
function decodeStudentToken(req: NextRequest): {
    admission_no: string;
    class: string;
    section: string;
} | null {
    try {
        const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
        const token = authHeader.slice(7);
        const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        if (!decoded.admission_no) return null;
        return decoded;
    } catch {
        return null;
    }
}

/**
 * GET /api/notifications
 * Fetch notification history for the authenticated student.
 * Returns notifications targeted at: all | this class | this class+section | this student.
 * Query params: ?limit=20&skip=0
 */
export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") ?? "50");
        const skip = parseInt(searchParams.get("skip") ?? "0");
        const isAdmin = searchParams.get("admin") === "true";

        if (isAdmin) {
            // Admin: return all notifications (no auth needed for admin panel)
            const notifications = await Notification.find({})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();
            return NextResponse.json({ success: true, data: notifications });
        }

        const studentInfo = decodeStudentToken(req);
        if (!studentInfo) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { admission_no, class: cls, section } = studentInfo;

        // Match notifications targeted at this student
        const notifications = await Notification.find({
            $or: [
                { targetType: "all" },
                { targetType: "class", targetClass: cls },
                { targetType: "section", targetClass: cls, targetSection: section },
                { targetType: "student", targetAdmissionNo: admission_no },
            ],
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // Map to response format with isRead per student
        const mapped = notifications.map((n: any) => ({
            id: n._id.toString(),
            title: n.title,
            message: n.message,
            type: n.type,
            route: n.route ?? "/notifications",
            isRead: Array.isArray(n.readBy) && n.readBy.includes(admission_no),
            createdAt: n.createdAt,
        }));

        return NextResponse.json({ success: true, data: mapped });
    } catch (error: any) {
        console.error("[Notifications GET] Error:", error.message);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

/**
 * POST /api/notifications/send
 * Admin endpoint to send push notifications.
 * Body: {
 *   title: string,
 *   message: string,
 *   type: NotificationType,
 *   route?: string,
 *   targetType: "all" | "class" | "section" | "student",
 *   targetClass?: string,
 *   targetSection?: string,
 *   targetAdmissionNo?: string,
 * }
 */
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const {
            title,
            message,
            type = "custom",
            route = "/notifications",
            targetType = "all",
            targetClass,
            targetSection,
            targetAdmissionNo,
        } = body;

        if (!title || !message) {
            return NextResponse.json(
                { success: false, error: "Title and message are required" },
                { status: 400 }
            );
        }

        // 1. Send FCM push notifications
        const { tokens, result } = await sendNotificationToStudents({
            targetType,
            targetClass,
            targetSection,
            targetAdmissionNo,
            payload: {
                title,
                body: message,
                data: {
                    type,
                    route,
                    title,
                    body: message,
                },
            },
        });

        // 2. Save notification record in DB
        const notification = await Notification.create({
            title,
            message,
            type,
            route,
            targetType,
            targetClass: targetClass || undefined,
            targetSection: targetSection || undefined,
            targetAdmissionNo: targetAdmissionNo || undefined,
            sentBy: "admin",
            recipientCount: tokens.length,
            readBy: [],
        });

        return NextResponse.json({
            success: true,
            data: {
                notificationId: notification._id,
                recipientTokens: tokens.length,
                fcmResult: result,
            },
        });
    } catch (error: any) {
        console.error("[Notifications POST] Error:", error.message);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

/**
 * PUT /api/notifications
 * Mark a notification as read for the authenticated student.
 * Body: { notificationId: string } or { markAll: true }
 */
export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const studentInfo = decodeStudentToken(req);
        if (!studentInfo) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { notificationId, markAll } = body;

        if (markAll) {
            // Mark all matching notifications as read
            await Notification.updateMany(
                {
                    $or: [
                        { targetType: "all" },
                        { targetType: "class", targetClass: studentInfo.class },
                        { targetType: "section", targetClass: studentInfo.class, targetSection: studentInfo.section },
                        { targetType: "student", targetAdmissionNo: studentInfo.admission_no },
                    ],
                    readBy: { $ne: studentInfo.admission_no },
                },
                { $addToSet: { readBy: studentInfo.admission_no } }
            );
        } else if (notificationId) {
            await Notification.updateOne(
                { _id: notificationId },
                { $addToSet: { readBy: studentInfo.admission_no } }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[Notifications PUT] Error:", error.message);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
