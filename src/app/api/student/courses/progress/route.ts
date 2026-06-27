import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import StudentCourse from "@/models/StudentCourse";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Authenticate user from session token
        let token = req.cookies.get("auth_token")?.value;
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return apiResponse.error("Not authenticated", 401);
        }

        let sessionUser: any = null;
        try {
            sessionUser = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        } catch (e) {
            return apiResponse.error("Invalid session", 401);
        }

        // 2. Parse request body
        const { courseId, itemId, completed } = await req.json();

        if (!courseId || !itemId) {
            return apiResponse.badRequest("courseId and itemId are required");
        }

        // 3. Find active enrollment
        const enrollment = await StudentCourse.findOne({
            student: sessionUser.id,
            course: courseId,
            status: "Active"
        });

        if (!enrollment) {
            return apiResponse.error("Enrollment not found for this course", 404);
        }

        // 4. Update completed items list
        if (!enrollment.completedItems) {
            enrollment.completedItems = [];
        }

        const itemIndex = enrollment.completedItems.indexOf(itemId);

        if (completed) {
            if (itemIndex === -1) {
                enrollment.completedItems.push(itemId);
            }
        } else {
            if (itemIndex !== -1) {
                enrollment.completedItems.splice(itemIndex, 1);
            }
        }

        // Trigger mongoose save to save arrays
        enrollment.markModified("completedItems");
        await enrollment.save();

        return apiResponse.success({
            message: "Progress updated successfully",
            completedItems: enrollment.completedItems
        });

    } catch (error: any) {
        console.error("Student progress update error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
