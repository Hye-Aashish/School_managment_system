import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import StudentLeave from "@/models/StudentLeave";

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const className = searchParams.get("class");
    const section = searchParams.get("section");
    const status = searchParams.get("status");

    try {
        let query: any = {};
        if (className) query.class = className;
        if (section) query.section = section;
        if (status) query.status = status;

        const leaves = await StudentLeave.find(query).populate("student", "fname lname admission_no").lean();
        return NextResponse.json({ success: true, data: leaves });
    } catch (error) {
        console.error("API Error (Leave GET):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const leave = await StudentLeave.create(body);
        return NextResponse.json({ success: true, data: leave });
    } catch (error) {
        console.error("API Error (Leave POST):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const body = await req.json();
        const updatedLeave = await StudentLeave.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ success: true, data: updatedLeave });
    } catch (error) {
        console.error("API Error (Leave PUT):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        await StudentLeave.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Leave deleted" });
    } catch (error) {
        console.error("API Error (Leave DELETE):", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
