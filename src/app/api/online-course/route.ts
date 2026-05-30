import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OnlineCourse from "@/models/OnlineCourse";
// Import related models so Mongoose registers their schemas before populate() runs
import "@/models/Class";
import "@/models/Section";
import "@/models/Staff";
import "@/models/CourseCategory";


export async function GET() {
    try {
        await dbConnect();
        const courses = await OnlineCourse.find()
            .populate("category")
            .populate({ path: "class" })
            .populate({ path: "sections" })
            .populate({ path: "assignTeacher" })
            .sort({ created_at: -1 });
        return NextResponse.json(courses);
    } catch (error: any) {
        console.error("GET /api/online-course error:", error);
        return NextResponse.json({ error: "Failed to fetch courses", detail: error?.message }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const course = await OnlineCourse.create(body);
        return NextResponse.json(course, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to create course" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { _id, ...updateData } = body;
        if (!_id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        const updated = await OnlineCourse.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update course" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        await OnlineCourse.findByIdAndDelete(id);
        return NextResponse.json({ message: "Course deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
    }
}
