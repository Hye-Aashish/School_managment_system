import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = await params;
    try {
        const student = await Student.findOne({ admission_no: id });
        if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(student);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await req.json();
        const student = await Student.findOneAndUpdate(
            { admission_no: id },
            { $set: body },
            { new: true }
        );
        if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(student);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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
