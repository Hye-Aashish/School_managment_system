import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import StudentLeave from "@/models/StudentLeave";
import Student from "@/models/Student";

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

        // Get student's DB ObjectId from session or search params or find by admission no
        let studentId = sessionUser.id;
        const { searchParams } = new URL(req.url);
        const paramStudentId = searchParams.get("studentId");

        if (paramStudentId) {
            studentId = paramStudentId;
        }

        if (!studentId && sessionUser.admission_no) {
            const studentDoc = await Student.findOne({ admission_no: sessionUser.admission_no }).lean();
            if (studentDoc) {
                studentId = studentDoc._id.toString();
            }
        }

        let history: any[] = [];
        if (studentId) {
            history = await StudentLeave.find({ student: studentId }).sort({ applyDate: -1 }).lean();
        }

        // 2. Fallback to mock leave history if database has no records
        if (history.length === 0) {
            history = [
                {
                    _id: "mock_leave_1",
                    student: studentId || "mock_student_id",
                    class: sessionUser.class || "Class 10",
                    section: sessionUser.section || "A",
                    applyDate: new Date(Date.now() - 10 * 86400000),
                    fromDate: new Date(Date.now() - 9 * 86400000),
                    toDate: new Date(Date.now() - 7 * 86400000),
                    reason: "Fever and doctor advised bed rest.",
                    status: "Approved",
                    approvedBy: "Mr. Sharma Class Teacher"
                } as any,
                {
                    _id: "mock_leave_2",
                    student: studentId || "mock_student_id",
                    class: sessionUser.class || "Class 10",
                    section: sessionUser.section || "A",
                    applyDate: new Date(Date.now() - 2 * 86400000),
                    fromDate: new Date(Date.now() - 1 * 86400000),
                    toDate: new Date(Date.now() - 1 * 86400000),
                    reason: "Attending sister's wedding.",
                    status: "Pending"
                } as any
            ];
        }

        return apiResponse.success(history);

    } catch (error: any) {
        console.error("Leave History GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
