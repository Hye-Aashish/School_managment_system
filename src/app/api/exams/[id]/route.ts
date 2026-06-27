import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Exam from "@/models/Exam";
import ExamGroup from "@/models/ExamGroup";

export async function PATCH(
     request: Request,
     { params }: { params: { id: string } }
) {
     try {
          await dbConnect();
          const body = await request.json();
          const { id } = params;

          const oldExam = await Exam.findById(id);
          if (!oldExam) {
               return NextResponse.json({ success: false, error: "Exam not found" }, { status: 404 });
          }

          const exam = await Exam.findByIdAndUpdate(id, body, { new: true });

          // If examGroup changed, update counts
          if (body.examGroup && body.examGroup !== oldExam.examGroup.toString()) {
               await Promise.all([
                    ExamGroup.findByIdAndUpdate(oldExam.examGroup, { $inc: { noOfExams: -1 } }),
                    ExamGroup.findByIdAndUpdate(body.examGroup, { $inc: { noOfExams: 1 } })
               ]);
          }

          return NextResponse.json({ success: true, data: exam });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}

export async function DELETE(
     request: Request,
     { params }: { params: { id: string } }
) {
     try {
          await dbConnect();
          const { id } = params;

          const exam = await Exam.findById(id);
          if (!exam) {
               return NextResponse.json({ success: false, error: "Exam not found" }, { status: 404 });
          }

          const groupId = exam.examGroup;
          await Exam.findByIdAndDelete(id);

          if (groupId) {
               await ExamGroup.findByIdAndUpdate(groupId, { $inc: { noOfExams: -1 } });
          }

          return NextResponse.json({ success: true, message: "Exam deleted successfully" });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
