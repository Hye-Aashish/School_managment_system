import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

/**
 * Decode the Bearer token (Base64 encoded JSON) to get student info.
 */
function decodeStudentToken(req: NextRequest): { admission_no: string; class: string; section: string } | null {
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
 * POST /api/fcm-token
 * Registers or updates an FCM device token for the authenticated student.
 * Body: { token: string }
 */
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { token } = body;

        if (!token || typeof token !== "string") {
            return NextResponse.json(
                { success: false, error: "FCM token is required" },
                { status: 400 }
            );
        }

        const studentInfo = decodeStudentToken(req);
        if (!studentInfo) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { admission_no } = studentInfo;

        // Remove existing entry with same token to avoid duplicates
        await Student.updateOne(
            { admission_no },
            { $pull: { fcm_tokens: { token } } as any }
        );

        // Add token with current timestamp, keep max 5 per student
        await Student.updateOne(
            { admission_no },
            {
                $push: {
                    fcm_tokens: {
                        $each: [{ token, updatedAt: new Date() }],
                        $slice: -5,
                    },
                } as any,
            }
        );

        console.log(`[FCM Token] Registered token for student: ${admission_no}`);
        return NextResponse.json({ success: true, message: "FCM token registered" });
    } catch (error: any) {
        console.error("[FCM Token POST] Error:", error.message);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/fcm-token
 * Removes an FCM token (call on logout).
 * Body: { token: string }
 */
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { token } = body;

        const studentInfo = decodeStudentToken(req);
        if (!studentInfo) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        if (token) {
            await Student.updateOne(
                { admission_no: studentInfo.admission_no },
                { $pull: { fcm_tokens: { token } } as any }
            );
        }

        return NextResponse.json({ success: true, message: "FCM token removed" });
    } catch (error: any) {
        console.error("[FCM Token DELETE] Error:", error.message);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
