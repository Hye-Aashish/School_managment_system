import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Incident from "@/models/Incident";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const incident = await Incident.findById(id);
    if (!incident) return NextResponse.json({ success: false, error: "Incident not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: incident });
  } catch (error: any) {
    console.error("GET Specific Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const body = await req.json();
    console.log(`PUT Incident ID: ${id}, Body:`, body);
    const incident = await Incident.findByIdAndUpdate(id, body, { new: true });
    if (!incident) {
      console.warn(`Incident not found with ID: ${id}`);
      return NextResponse.json({ success: false, error: "Incident not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: incident });
  } catch (error: any) {
    console.error("PUT Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const incident = await Incident.findByIdAndDelete(id);
    if (!incident) return NextResponse.json({ success: false, error: "Incident not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: { message: "Incident deleted successfully" } });
  } catch (error: any) {
    console.error("DELETE Incident Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
