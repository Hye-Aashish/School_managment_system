import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AdmitCardTemplate from "@/models/AdmitCardTemplate";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
     try {
          await dbConnect();
          const body = await request.json();
          const template = await AdmitCardTemplate.findByIdAndUpdate(params.id, body, { new: true });
          if (!template) {
               return NextResponse.json({ success: false, error: "Template not found" }, { status: 404 });
          }
          return NextResponse.json({ success: true, data: template });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
     try {
          await dbConnect();
          const template = await AdmitCardTemplate.findByIdAndDelete(params.id);
          if (!template) {
               return NextResponse.json({ success: false, error: "Template not found" }, { status: 404 });
          }
          return NextResponse.json({ success: true, data: {} });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}
