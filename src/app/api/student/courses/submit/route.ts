import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import StudentCourse from "@/models/StudentCourse";
import OnlineCourseAssignmentSubmission from "@/models/OnlineCourseAssignmentSubmission";

// POST /api/student/courses/submit - Create or update an assignment submission
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
        const { courseId, itemId, message, fileUrl, fileName } = await req.json();

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

        // 4. Create or update assignment submission
        const submission = await OnlineCourseAssignmentSubmission.findOneAndUpdate(
            { course: courseId, itemId: itemId, student: sessionUser.id },
            {
                message,
                fileUrl,
                fileName,
                submittedAt: new Date(),
                status: "submitted" // Reset status if they resubmit, or keep it. Since index is unique, it updates.
            },
            { new: true, upsert: true }
        );

        // 5. Automatically mark the curriculum item as completed in StudentCourse
        if (!enrollment.completedItems) {
            enrollment.completedItems = [];
        }

        const itemIndex = enrollment.completedItems.indexOf(itemId);
        if (itemIndex === -1) {
            enrollment.completedItems.push(itemId);
            enrollment.markModified("completedItems");
            await enrollment.save();
        }

        return apiResponse.success({
            message: "Assignment submitted successfully",
            submission,
            completedItems: enrollment.completedItems
        });

    } catch (error: any) {
        console.error("Student assignment submission error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// GET /api/student/courses/submit - Get all submissions for a student in a course
export async function GET(req: NextRequest) {
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

        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        if (!courseId) {
            return apiResponse.badRequest("courseId is required");
        }

        // Find all submissions by this student for this course
        const submissions = await OnlineCourseAssignmentSubmission.find({
            course: courseId,
            student: sessionUser.id
        });

        return apiResponse.success(submissions);

    } catch (error: any) {
        console.error("Fetch student submissions error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
