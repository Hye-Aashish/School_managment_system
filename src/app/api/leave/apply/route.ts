import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import StudentLeave from "@/models/StudentLeave";
import Student from "@/models/Student";

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

        if (sessionUser.role !== "Student") {
            return apiResponse.error("Only students can submit leave requests", 403);
        }

        const body = await req.json();
        const { fromDate, toDate, reason, docs } = body;

        if (!fromDate || !toDate) {
            return apiResponse.badRequest("fromDate and toDate are required fields");
        }

        // Fetch student's real DB _id using their admission number if it is not in session
        let studentObjectId = sessionUser.id;
        if (!studentObjectId) {
            const studentDoc = await Student.findOne({ admission_no: sessionUser.admission_no });
            if (!studentDoc) {
                return apiResponse.error("Student record not found in system", 404);
            }
            studentObjectId = studentDoc._id;
        }

        // Create the student leave request in the database
        const leaveRequest = await StudentLeave.create({
            student: studentObjectId,
            class: sessionUser.class,
            section: sessionUser.section,
            applyDate: new Date(),
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
            reason: reason || "",
            status: "Pending",
            docs: docs || ""
        });

        return apiResponse.success(leaveRequest, 201);

    } catch (error: any) {
        console.error("Leave Application Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
