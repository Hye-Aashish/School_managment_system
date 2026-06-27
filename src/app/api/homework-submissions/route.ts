import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import HomeworkSubmission from "@/models/HomeworkSubmission";
import Student from "@/models/Student";
import Homework from "@/models/Homework";

// GET submissions
export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const homeworkId = searchParams.get("homeworkId");
        const studentId = searchParams.get("studentId");
        const className = searchParams.get("class");
        const sectionName = searchParams.get("section");

        let query: any = {};
        if (homeworkId) query.homework = homeworkId;
        
        if (studentId) {
            const isValidObjectId = mongoose.Types.ObjectId.isValid(studentId);
            if (isValidObjectId) {
                query.student = studentId;
            } else {
                // Find student by admission number
                const studentObj = await Student.findOne({ admission_no: studentId });
                if (studentObj) {
                    query.student = studentObj._id;
                } else {
                    // Force query to return empty by searching for non-matching ID
                    query.student = new mongoose.Types.ObjectId();
                }
            }
        }

        // If class/section filters are given but not homeworkId directly,
        // we can find homeworks matching those criteria first, or filter populated students.
        if (className || sectionName) {
            let hwQuery: any = {};
            if (className) hwQuery.class = className;
            if (sectionName) hwQuery.section = sectionName;
            
            const matchedHomeworks = await Homework.find(hwQuery).select("_id");
            const hwIds = matchedHomeworks.map(h => h._id);
            query.homework = { $in: hwIds };
        }

        // Fetch submissions and populate student & homework details
        const submissions = await HomeworkSubmission.find(query)
            .populate("student", "fname lname roll_no admission_no class section")
            .populate("homework", "subject description submissionDate homeworkDate")
            .sort({ submittedAt: -1 })
            .lean();

        return NextResponse.json({ success: true, data: submissions });
    } catch (error: any) {
        console.error("GET homework submissions error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// POST or update submission (Student)
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { homeworkId, studentId, message, fileUrl, fileName } = body;

        if (!homeworkId || !studentId) {
            return NextResponse.json({ success: false, error: "Homework ID and Student ID are required" }, { status: 400 });
        }

        // Find student by ID or admission_no (let's support both just in case)
        let studentObj = null;
        if (mongoose.Types.ObjectId.isValid(studentId)) {
            studentObj = await Student.findById(studentId);
        }
        if (!studentObj) {
            studentObj = await Student.findOne({ admission_no: studentId });
        }
        if (!studentObj) {
            return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
        }

        // Find existing submission to update or create new one
        const filter = { homework: homeworkId, student: studentObj._id };
        const update = {
            message,
            fileUrl,
            fileName,
            submittedAt: new Date(),
            status: "submitted" // Reset status on resubmission
        };

        const submission = await HomeworkSubmission.findOneAndUpdate(
            filter,
            { $set: update },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: submission });
    } catch (error: any) {
        console.error("POST homework submission error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT evaluate submission (Admin/Teacher)
export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { submissionId, feedback, grade, status } = body;

        if (!submissionId) {
            return NextResponse.json({ success: false, error: "Submission ID is required" }, { status: 400 });
        }

        const updatedFields: any = {
            feedback,
            grade,
            status: status || "evaluated",
            evaluationDate: new Date()
        };

        const submission = await HomeworkSubmission.findByIdAndUpdate(
            submissionId,
            { $set: updatedFields },
            { new: true }
        );

        if (!submission) {
            return NextResponse.json({ success: false, error: "Submission not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: submission });
    } catch (error: any) {
        console.error("PUT homework submission evaluation error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
