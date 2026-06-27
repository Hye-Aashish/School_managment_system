import { NextRequest, NextResponse } from "next/server";
import { apiResponse } from "@/lib/response";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { admissionNo, password } = body;

        if (!admissionNo || !password) {
            return apiResponse.badRequest("Admission number and password are required");
        }

        // Search for student in database
        const student = await Student.findOne({ admission_no: admissionNo }).lean();
        if (!student) {
            return apiResponse.error("Invalid credentials. Student record not found.", 401);
        }

        if (student.status === "Disabled") {
            return apiResponse.error("Student account deactivated. Please contact school administration.", 403);
        }

        // Verify password
        const storedPassword = student.password || "student123";
        const isValidPassword = password === storedPassword;

        if (!isValidPassword) {
            return apiResponse.error("Invalid password.", 401);
        }

        // Construct User Session object
        const userObj = {
            id: student._id.toString(),
            admission_no: student.admission_no,
            roll_no: student.roll_no || "",
            class: student.class,
            section: student.section,
            name: `${student.fname} ${student.lname || ""}`.trim(),
            role: "Student",
            email: student.email || "",
            student_house: student.student_house || ""
        };

        // Serialize user session to Base64 token
        const token = Buffer.from(JSON.stringify(userObj)).toString("base64");

        const response = apiResponse.success({
            user: userObj,
            token
        });

        // Set HttpOnly cookie for session tracking
        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/"
        });

        return response;

    } catch (error: any) {
        console.error("Student Login API Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
