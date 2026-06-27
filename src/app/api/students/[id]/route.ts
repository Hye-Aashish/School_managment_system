import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import StudentCourse from "@/models/StudentCourse";
import "@/models/OnlineCourse"; // Ensure OnlineCourse is registered for populate

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const student = await Student.findOne({ admission_no: id }).lean();
        if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
        
        // Fetch enrolled online courses
        const enrolledCourses = await StudentCourse.find({ student: student._id })
            .populate("course")
            .lean();
            
        return NextResponse.json({ ...student, enrolledCourses });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await req.json();

        // Avatar Image Size Validation: Ensure image is under 30KB
        if (body.photo) {
            let base64Length = 0;
            if (body.photo.startsWith("data:image")) {
                const parts = body.photo.split(",");
                if (parts[1]) {
                    base64Length = parts[1].length;
                }
            } else {
                base64Length = body.photo.length;
            }

            const sizeInBytes = (base64Length * 3) / 4;
            const maxSizeInBytes = 30 * 1024; // 30KB
            if (sizeInBytes > maxSizeInBytes) {
                return NextResponse.json(
                    { error: "Image validation failed: Avatar must be under 30KB (cropped)." },
                    { status: 400 }
                );
            }
        }

        const student = await Student.findOneAndUpdate(
            { admission_no: id },
            { $set: body },
            { new: true }
        );
        if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(student);
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error", detail: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const student = await Student.findOneAndDelete({ admission_no: id });
        if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(student);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
