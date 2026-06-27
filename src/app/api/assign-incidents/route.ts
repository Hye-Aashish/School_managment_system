import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentIncident from "@/models/StudentIncident";
import Student from "@/models/Student";
import Incident from "@/models/Incident";

export async function GET() {
  await dbConnect();
  // Ensure models are registered (prevents tree-shaking)
  console.log("Registered models:", Student.modelName, Incident.modelName);
  try {
    const assignments = await StudentIncident.find({}).populate("student").populate("incident").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: assignments });
  } catch (error: any) {
    console.error("GET Assign Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    console.log("POST Assign Incident Body:", body);
    const assignment = await StudentIncident.create(body);

    // 🔔 Fire push notification to the assigned student
    if (body.student && body.incident) {
      // Run asynchronously so it doesn't block the API response
      (async () => {
        try {
          const studentObj = await Student.findById(body.student);
          const incidentObj = await Incident.findById(body.incident);
          if (studentObj && incidentObj) {
            const { sendNotificationToStudents } = await import("@/lib/fcm");
            const { default: Notification } = await import("@/models/Notification");

            const targetType = "student";
            const pointsStr = incidentObj.point >= 0 ? `+${incidentObj.point}` : `${incidentObj.point}`;
            const title = `🌟 Behavior Update: ${incidentObj.title}`;
            const message = `${incidentObj.title} has been assigned to you (${pointsStr} points).`;
            const route = "/behavior";

            const { tokens } = await sendNotificationToStudents({
              targetType,
              targetAdmissionNo: studentObj.admission_no,
              payload: {
                title,
                body: message,
                data: {
                  type: "behavior",
                  route,
                  title,
                  body: message,
                },
              },
            });

            await Notification.create({
              title,
              message,
              type: "behavior",
              route,
              targetType,
              targetAdmissionNo: studentObj.admission_no,
              sentBy: body.assignedBy || "system",
              recipientCount: tokens.length,
              readBy: [],
            });
            console.log(`[Behavior Notification] Successfully sent and created for admission_no: ${studentObj.admission_no}`);
          }
        } catch (err: any) {
          console.error("Failed to send behavior notification:", err);
        }
      })();
    }

    return NextResponse.json({ success: true, data: assignment });
  } catch (error: any) {
    console.error("POST Assign Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
