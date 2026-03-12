import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ZoomLiveClass from "@/models/ZoomLiveClass";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await req.json();
    const updated = await ZoomLiveClass.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
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
    const updatedClass = await ZoomLiveClass.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedClass) {
      return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedClass });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedClass = await ZoomLiveClass.findByIdAndDelete(id);
    if (!deletedClass) {
      return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
