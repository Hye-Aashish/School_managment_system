import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import OnlineAdmission from "@/models/OnlineAdmission";

export async function GET() {
    await dbConnect();
    try {
        const [
            totalStudents,
            onlineAdmissions,
            disabledStudents
        ] = await Promise.all([
            Student.countDocuments({ status: "Active" }),
            OnlineAdmission.countDocuments({}),
            Student.countDocuments({ status: "Disabled" })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                students: totalStudents,
                admissions: onlineAdmissions,
                disabled: disabledStudents
            }
        });
    } catch (error) {
        console.error("API Error (Sidebar Stats):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
