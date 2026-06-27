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

          // Get all schedule for this exam to know the subjects (check both ExamSchedule and CbseExamSchedule)
          let schedules = await ExamSchedule.find({ exam: examId });
          if (schedules.length === 0) {
               // Fallback to CbseExamSchedule
               const CbseExamSchedule = require("@/models/CbseExamSchedule").default;
               schedules = await CbseExamSchedule.find({ exam: examId });
          }
          const subjects = schedules.map(s => ({
               subject: s.subject,
               maxMarks: s.maxMarks,
               minMarks: s.minMarks
          }));

          // Get all marks for this exam and class/section students (check both ExamMark and CbseMarks)
          const studentIds = students.map(s => s._id);
          let marks = await ExamMark.find({ exam: examId, student: { $in: studentIds } });
          const isCbse = marks.length === 0 && schedules.length > 0;
          let cbseMarks: any[] = [];
          if (isCbse) {
               const CbseMarks = require("@/models/CbseMarks").default;
               cbseMarks = await CbseMarks.find({ exam: examId, student: { $in: studentIds } });
          }

          // Map marks to students
          const results = students.map(student => {
               const marksMap: { [key: string]: any } = {};
               let grandTotal = 0;
               let totalMax = 0;

               if (isCbse) {
                    const studentCbseMarkObj = cbseMarks.find(m => m.student.toString() === student._id.toString());
                    let studentCbseMarks: any = {};
                    if (studentCbseMarkObj && studentCbseMarkObj.marks) {
                         if (studentCbseMarkObj.marks instanceof Map) {
                              studentCbseMarks = Object.fromEntries(studentCbseMarkObj.marks);
                         } else {
                              studentCbseMarks = studentCbseMarkObj.marks;
                         }
                    }
                    schedules.forEach(s => {
                         const subData = studentCbseMarks[s.subject] || {};
                         const theory = subData.theory || 0;
                         const practical = subData.practical || 0;
                         const assignment = subData.assignment || 0;
                         const total = subData.total !== undefined ? subData.total : (theory + practical + assignment);

                         marksMap[s.subject] = { theory, practical, assignment, total };
                         grandTotal += total;
                         totalMax += s.maxMarks;
                    });
               } else {
                    const studentMarks = marks.filter(m => m.student.toString() === student._id.toString());
                    studentMarks.forEach(m => {
                         marksMap[m.subject] = m.marks;
                         grandTotal += m.marks;
                         const sched = schedules.find(s => s.subject === m.subject);
                         if (sched) totalMax += sched.maxMarks;
                    });
               }

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

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          const { examId, studentMarks } = body;

          if (!examId || !studentMarks || !Array.isArray(studentMarks)) {
               return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
          }

          // Check if this is a CBSE Exam
          const CbseExam = require("@/models/CbseExam").default;
          const isCbse = await CbseExam.exists({ _id: examId });

          if (isCbse) {
               const CbseMarks = require("@/models/CbseMarks").default;
               for (const item of studentMarks) {
                    const { studentId, marks } = item;
                    // Read existing marks
                    const existingRecord = await CbseMarks.findOne({ exam: examId, student: studentId });
                    let mergedMarks: any = {};
                    if (existingRecord && existingRecord.marks) {
                         if (existingRecord.marks instanceof Map) {
                              mergedMarks = Object.fromEntries(existingRecord.marks);
                         } else {
                              mergedMarks = { ...existingRecord.marks };
                         }
                    }

                    // Merge updated marks values
                    Object.keys(marks).forEach(key => {
                         if (key.endsWith("_theory")) {
                              const subject = key.slice(0, -7);
                              const val = parseFloat(marks[key]) || 0;
                              if (!mergedMarks[subject]) {
                                   mergedMarks[subject] = { theory: 0, practical: 0, assignment: 0, total: 0 };
                              }
                              mergedMarks[subject].theory = val;
                              mergedMarks[subject].total = mergedMarks[subject].theory + mergedMarks[subject].practical + (mergedMarks[subject].assignment || 0);
                         } else if (key.endsWith("_practical")) {
                              const subject = key.slice(0, -10);
                              const val = parseFloat(marks[key]) || 0;
                              if (!mergedMarks[subject]) {
                                   mergedMarks[subject] = { theory: 0, practical: 0, assignment: 0, total: 0 };
                              }
                              mergedMarks[subject].practical = val;
                              mergedMarks[subject].total = (mergedMarks[subject].theory || 0) + mergedMarks[subject].practical + (mergedMarks[subject].assignment || 0);
                         } else {
                              const subject = key;
                              const val = parseFloat(marks[key]) || 0;
                              if (!mergedMarks[subject]) {
                                   mergedMarks[subject] = { theory: val, practical: 0, assignment: 0, total: val };
                              } else {
                                   mergedMarks[subject].theory = val;
                                   mergedMarks[subject].total = mergedMarks[subject].theory + (mergedMarks[subject].practical || 0) + (mergedMarks[subject].assignment || 0);
                              }
                         }
                    });

                    await CbseMarks.findOneAndUpdate(
                         { exam: examId, student: studentId },
                         { marks: mergedMarks },
                         { upsert: true, new: true }
                    );
               }
          } else {
               for (const item of studentMarks) {
                    const { studentId, marks } = item;
                    for (const subject of Object.keys(marks)) {
                         const markValue = parseFloat(marks[subject]) || 0;
                         await ExamMark.findOneAndUpdate(
                              { exam: examId, student: studentId, subject: subject },
                              { marks: markValue, absent: false },
                              { upsert: true, new: true }
                         );
                    }
               }
          }

          // 🔔 Fire push notification to affected class/section students
          if (studentMarks && studentMarks.length > 0) {
               (async () => {
                    try {
                         const ExamModelObj = require("@/models/Exam").default;
                         const CbseExamModelObj = require("@/models/CbseExam").default;
                         const { sendNotificationToStudents } = await import("@/lib/fcm");
                         const { default: Notification } = await import("@/models/Notification");

                         // Retrieve exam name
                         let examName = "Exam";
                         if (isCbse) {
                              const examObj = await CbseExamModelObj.findById(examId);
                              if (examObj) examName = examObj.name;
                         } else {
                              const examObj = await ExamModelObj.findById(examId);
                              if (examObj) examName = examObj.name;
                         }

                         // Find class and section from the first student in the marks list
                         const sampleStudent = await Student.findById(studentMarks[0].studentId);
                         if (sampleStudent) {
                              const targetClass = sampleStudent.class;
                              const targetSection = sampleStudent.section;

                              const title = "📝 Exam Results Published";
                              const message = `Your results for ${examName} have been published.`;
                              const route = isCbse ? "/cbse-exam" : "/exams";
                              const type = isCbse ? "cbse_exam" : "exam";

                              const { tokens } = await sendNotificationToStudents({
                                   targetType: "section",
                                   targetClass,
                                   targetSection,
                                   payload: {
                                        title,
                                        body: message,
                                        data: {
                                             type,
                                             route,
                                             title,
                                             body: message,
                                        },
                                   },
                              });

                              await Notification.create({
                                   title,
                                   message,
                                   type,
                                   route,
                                   targetType: "section",
                                   targetClass,
                                   targetSection,
                                   sentBy: "system",
                                   recipientCount: tokens.length,
                                   readBy: [],
                              });
                              console.log(`[Exam Result Notification] Successfully sent and created for class: ${targetClass}, section: ${targetSection}`);
                         }
                    } catch (err) {
                         console.error("Failed to send exam result notification:", err);
                    }
               })();
          }

          return NextResponse.json({ success: true, data: { success: true }, message: "Marks saved successfully" });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}
