import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import StudentIncident from "@/models/StudentIncident";
import Incident from "@/models/Incident";

export async function GET() {
  await dbConnect();
  try {
    const students = await Student.find({ status: "Active" }).select("fname lname admission_no class section gender phone").lean();
    const assignments = await StudentIncident.find({}).populate("incident").lean();

    const studentPoints = students.map((student: any) => {
      const studentAssignments = assignments.filter((a: any) => a.student?.toString() === student._id.toString());
      const totalPoints = studentAssignments.reduce((acc: number, curr: any) => acc + (curr.incident?.point || 0), 0);
      return {
        ...student,
        totalPoints,
      };
    });

    return NextResponse.json({ success: true, data: studentPoints });
  } catch (error: any) {
    console.error("GET Student Points Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
