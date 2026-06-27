import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import OnlineExam from "@/models/OnlineExam";
import OnlineExamSubmission from "@/models/OnlineExamSubmission";
import OnlineQuestion from "@/models/OnlineQuestion";

// Helper to authenticate student
function getAuthStudent(req: NextRequest) {
    let token = req.cookies.get("auth_token")?.value;
    if (!token) {
        const authHeader = req.headers.get("authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
    }

    if (!token) return null;

    try {
        const sessionUser = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        if (sessionUser.role === "Student") {
            return sessionUser;
        }
    } catch (e) {
        return null;
    }
    return null;
}

// GET: Fetch online exams relevant for the logged-in student, including their attempt status
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        // Reference OnlineQuestion to prevent tree-shaking of the model registration
        const _questionModel = OnlineQuestion;
        const student = getAuthStudent(req);
        if (!student) {
            return apiResponse.error("Not authenticated", 401);
        }

        const { class: studentClass, section, id: studentId } = student;

        // Fetch published exams for this class and section
        const exams = await OnlineExam.find({
            class: studentClass,
            section: section,
            is_published: true
        }).populate("questions").sort({ exam_from: 1 }).lean();

        // Fetch submissions for this student
        const submissions = await OnlineExamSubmission.find({ student: studentId }).lean();

        const now = new Date();

        const data = exams.map((exam: any) => {
            const examSubmissions = submissions.filter(
                (sub) => sub.exam.toString() === exam._id.toString()
            );

            const attemptsCount = examSubmissions.length;
            const maxAttempts = exam.attempts || 1;
            const isCompleted = attemptsCount >= maxAttempts;

            // Get highest score among submissions
            let score: number | null = null;
            if (attemptsCount > 0) {
                score = Math.max(...examSubmissions.map((sub) => sub.score));
            }

            const examFrom = new Date(exam.exam_from);
            const examTo = new Date(exam.exam_to);

            const isActive = now >= examFrom && now <= examTo;
            const isUpcoming = now < examFrom;
            const isClosed = now > examTo;

            return {
                ...exam,
                attemptsCount,
                attemptsLeft: Math.max(0, maxAttempts - attemptsCount),
                isCompleted,
                score,
                isActive,
                isUpcoming,
                isClosed
            };
        });

        return apiResponse.success(data);
    } catch (error: any) {
        console.error("Student Online Exams GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// POST: Submit online exam attempt
export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const student = getAuthStudent(req);
        if (!student) {
            return apiResponse.error("Not authenticated", 401);
        }

        const { id: studentId } = student;
        const body = await req.json();
        const { examId, score, answers } = body;

        if (!examId || score === undefined) {
            return apiResponse.badRequest("Missing examId or score");
        }

        // Verify exam exists and is active
        const exam = await OnlineExam.findById(examId);
        if (!exam) {
            return apiResponse.error("Exam not found", 404);
        }

        const now = new Date();
        if (now < new Date(exam.exam_from) || now > new Date(exam.exam_to)) {
            return apiResponse.error("Exam is not active", 400);
        }

        // Verify attempts left
        const submissionsCount = await OnlineExamSubmission.countDocuments({
            student: studentId,
            exam: examId
        });

        if (submissionsCount >= (exam.attempts || 1)) {
            return apiResponse.error("No attempts remaining for this exam", 400);
        }

        // Register submission
        const submission = await OnlineExamSubmission.create({
            student: studentId,
            exam: examId,
            score,
            answers: answers || [],
            attempt_no: submissionsCount + 1,
            submitted_at: now
        });

        return apiResponse.success(submission);
    } catch (error: any) {
        console.error("Student Online Exam Submission POST Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
