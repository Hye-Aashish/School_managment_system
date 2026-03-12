import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ZoomLiveMeeting from "@/models/ZoomLiveMeeting";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await req.json();
    const updated = await ZoomLiveMeeting.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ success: false, error: "Meeting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const updatedMeeting = await ZoomLiveMeeting.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMeeting) {
      return NextResponse.json({ success: false, error: "Meeting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedMeeting });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedMeeting = await ZoomLiveMeeting.findByIdAndDelete(id);
    if (!deletedMeeting) {
      return NextResponse.json({ success: false, error: "Meeting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
