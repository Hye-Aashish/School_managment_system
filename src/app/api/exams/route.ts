import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Exam from "@/models/Exam";
import ExamGroup from "@/models/ExamGroup";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
     try {
          await dbConnect();
          const { searchParams } = new URL(request.url);
          const groupId = searchParams.get("groupId");

          let query = {};
          if (groupId && mongoose.Types.ObjectId.isValid(groupId)) {
               query = { examGroup: new mongoose.Types.ObjectId(groupId) };
          } else if (groupId) {
               // If invalid ObjectId string is passed, return empty array instead of failing or using string query
               return NextResponse.json({ success: true, data: [] });
          }

          const exams = await Exam.find(query).populate("examGroup").sort({ createdAt: -1 });
          return NextResponse.json({ success: true, data: exams });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          const exam = await Exam.create(body);

          if (body.examGroup) {
               await ExamGroup.findByIdAndUpdate(body.examGroup, { $inc: { noOfExams: 1 } });
          }

          // 🔔 Fire push notification to all students
          (async () => {
               try {
                    const { sendNotificationToStudents } = await import("@/lib/fcm");
                    const { default: Notification } = await import("@/models/Notification");

                    const title = "📝 New Exam Scheduled";
                    const message = `A new exam "${exam.name}" has been scheduled. Check your portal for details.`;
                    const route = "/exams";

                    const { tokens } = await sendNotificationToStudents({
                         targetType: "all",
                         payload: {
                              title,
                              body: message,
                              data: {
                                   type: "exam",
                                   route,
                                   title,
                                   body: message,
                              },
                         },
                    });

                    await Notification.create({
                         title,
                         message,
                         type: "exam",
                         route,
                         targetType: "all",
                         sentBy: "system",
                         recipientCount: tokens.length,
                         readBy: [],
                    });
               } catch (err) {
                    console.error("Failed to send general exam notification:", err);
               }
          })();

          return NextResponse.json({ success: true, data: exam }, { status: 201 });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
