import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentIncident from "@/models/StudentIncident";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const assignment = await StudentIncident.findById(id).populate("student").populate("incident");
    if (!assignment) return NextResponse.json({ success: false, error: "Assignment not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: assignment });
  } catch (error: any) {
    console.error("GET Student Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const body = await req.json();
    const assignment = await StudentIncident.findByIdAndUpdate(id, body, { new: true });
    if (!assignment) return NextResponse.json({ success: false, error: "Assignment not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: assignment });
  } catch (error: any) {
    console.error("PUT Student Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const assignment = await StudentIncident.findByIdAndDelete(id);
    if (!assignment) return NextResponse.json({ success: false, error: "Assignment not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: { message: "Assignment deleted successfully" } });
  } catch (error: any) {
    console.error("DELETE Student Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
