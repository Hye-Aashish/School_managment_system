import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ExamMark from "@/models/ExamMark";
import Student from "@/models/Student";
import ExamSchedule from "@/models/ExamSchedule";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
     try {
          await dbConnect();
          const { searchParams } = new URL(request.url);
          const examId = searchParams.get("examId");
          const className = searchParams.get("class");
          const section = searchParams.get("section");
          
          if (!examId || !className || !section) {
               return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
          }
          
          // Get all students in that class/section
          const students = await Student.find({ class: className, section: section, status: "Active" }).sort({ roll_no: 1 });
          
          // Get all schedule for this exam to know the subjects
          const schedules = await ExamSchedule.find({ exam: examId });
          const subjects = schedules.map(s => ({
               subject: s.subject,
               maxMarks: s.maxMarks,
               minMarks: s.minMarks
          }));
          
          // Get all marks for this exam and class/section students
          const studentIds = students.map(s => s._id);
          const marks = await ExamMark.find({ exam: examId, student: { $in: studentIds } });
          
          // Map marks to students
          const results = students.map(student => {
               const studentMarks = marks.filter(m => m.student.toString() === student._id.toString());
               const marksMap: { [key: string]: number } = {};
               let grandTotal = 0;
               let totalMax = 0;
               
               studentMarks.forEach(m => {
                    marksMap[m.subject] = m.marks;
                    grandTotal += m.marks;
                    const sched = schedules.find(s => s.subject === m.subject);
                    if (sched) totalMax += sched.maxMarks;
               });
               
               const percent = totalMax > 0 ? (grandTotal / totalMax) * 100 : 0;
               
               return {
                    student,
                    marks: marksMap,
                    grandTotal,
                    percent: percent.toFixed(2),
                    result: percent >= 35 ? "Pass" : "Fail" // Simple logic for now
               };
          });
          
          return NextResponse.json({ 
               success: true, 
               data: {
                    results,
                    subjects
               }
          });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}
