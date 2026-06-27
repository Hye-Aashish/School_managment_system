import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import CbseMarks from "@/models/CbseMarks";
import Student from "@/models/Student";
import CbseExam from "@/models/CbseExam";
import Exam from "@/models/Exam";
import ExamMark from "@/models/ExamMark";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const examId = searchParams.get("examId");
        const studentId = searchParams.get("studentId");
        const className = searchParams.get("class");
        const section = searchParams.get("section");
        const search = searchParams.get("search");

        if (examId && studentId) {
             const isGeneralExam = await Exam.exists({ _id: examId });
             if (isGeneralExam) {
                  const generalMarks = await ExamMark.find({ exam: examId, student: studentId });
                  
                  // Construct marks map
                  const marksMap: any = {};
                  generalMarks.forEach(m => {
                       marksMap[m.subject] = {
                            theory: m.absent ? 0 : m.marks,
                            practical: 0,
                            total: m.absent ? 0 : m.marks
                       };
                  });
                  
                  // Return as a single element in array matching CbseMarks response structure, wrapped in success: true
                  return NextResponse.json({
                       success: true,
                       data: [{
                            _id: `${studentId}_${examId}`,
                            student: studentId,
                            exam: examId,
                            marks: marksMap
                       }]
                  });
             }
        }

        let query: any = {};
        if (examId) query.exam = examId;
        if (studentId) query.student = studentId;

        if (className || section || search) {
            const studentQuery: any = {};
            if (className) studentQuery.class = className;
            if (section) studentQuery.section = section;
            if (search) {
                const searchRegex = { $regex: search, $options: "i" };
                studentQuery.$or = [
                    { fname: searchRegex },
                    { lname: searchRegex },
                    { admission_no: searchRegex }
                ];
            }
            const students = await Student.find(studentQuery).select("_id").lean();
            const studentIds = students.map(s => s._id);
            query.student = { $in: studentIds };
        }

        const marks = await CbseMarks.find(query)
            .populate("student", "fname lname admission_no class section")
            .populate("exam", "name")
            .sort({ created_at: -1 });
        return NextResponse.json({ success: true, data: marks });
    } catch (error: any) {
        console.error("API Error (CBSE Marks GET):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { student, exam, marks } = body;

        // Upsert logic for marks
        const updatedMarks = await CbseMarks.findOneAndUpdate(
            { student, exam },
            { marks },
            { new: true, upsert: true }
        );

        return NextResponse.json(updatedMarks, { status: 201 });
    } catch (error: any) {
        console.error("API Error (CBSE Marks POST):", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
