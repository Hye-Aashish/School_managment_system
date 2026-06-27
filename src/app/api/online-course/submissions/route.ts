import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import OnlineCourseAssignmentSubmission from "@/models/OnlineCourseAssignmentSubmission";
import Student from "@/models/Student"; // Register model

// GET /api/online-course/submissions - List student submissions for a specific curriculum item
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");
        const itemId = searchParams.get("itemId");

        if (!courseId || !itemId) {
            return NextResponse.json({ error: "courseId and itemId are required" }, { status: 400 });
        }

        const submissions = await OnlineCourseAssignmentSubmission.find({
            course: courseId,
            itemId: itemId
        }).populate("student", "fname lname roll_no admission_no class section");

        return NextResponse.json(submissions);
    } catch (error: any) {
        console.error("GET /api/online-course/submissions error:", error);
        return NextResponse.json({ error: "Failed to fetch submissions", detail: error?.message }, { status: 500 });
    }
}

// PUT /api/online-course/submissions - Evaluate and score a student's submission
export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { submissionId, marks, feedback, evaluatedBy } = body;

        if (!submissionId) {
            return NextResponse.json({ error: "submissionId is required" }, { status: 400 });
        }

        if (marks !== undefined && (typeof marks !== "number" || marks < 0 || marks > 100)) {
            return NextResponse.json({ error: "Marks must be a number between 0 and 100" }, { status: 400 });
        }

        const submission = await OnlineCourseAssignmentSubmission.findById(submissionId);
        if (!submission) {
            return NextResponse.json({ error: "Submission not found" }, { status: 404 });
        }

        submission.status = "evaluated";
        submission.marks = marks;
        submission.feedback = feedback;
        submission.evaluatedBy = evaluatedBy || "Teacher";
        submission.evaluationDate = new Date();

        await submission.save();

        // Populate student information before returning
        await submission.populate("student", "fname lname roll_no admission_no class section");

        return NextResponse.json(submission);
    } catch (error: any) {
        console.error("PUT /api/online-course/submissions error:", error);
        return NextResponse.json({ error: "Failed to evaluate submission", detail: error?.message }, { status: 500 });
    }
}
