import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GmeetLiveMeeting from "@/models/GmeetLiveMeeting";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { status } = await req.json();
    const updated = await GmeetLiveMeeting.findByIdAndUpdate(
      params.id,
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedMeeting = await GmeetLiveMeeting.findByIdAndUpdate(params.id, body, {
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedMeeting = await GmeetLiveMeeting.findByIdAndDelete(params.id);
    if (!deletedMeeting) {
      return NextResponse.json({ success: false, error: "Meeting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
