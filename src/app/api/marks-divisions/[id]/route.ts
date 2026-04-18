import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MarksDivision from "@/models/MarksDivision";

export async function DELETE(
     request: Request,
     { params }: { params: { id: string } }
) {
     try {
          await dbConnect();
          const deleted = await MarksDivision.findByIdAndDelete(params.id);
          if (!deleted) {
               return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
          }
          return NextResponse.json({ success: true, data: {} });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}

export async function PATCH(
     request: Request,
     { params }: { params: { id: string } }
) {
     try {
          await dbConnect();
          const body = await request.json();
          const updated = await MarksDivision.findByIdAndUpdate(params.id, body, { new: true });
          if (!updated) {
               return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
          }
          return NextResponse.json({ success: true, data: updated });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
