import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MarksDivision from "@/models/MarksDivision";

export const dynamic = "force-dynamic";

export async function GET() {
     try {
          await dbConnect();
          const divisions = await MarksDivision.find({}).sort({ createdAt: -1 });
          return NextResponse.json({ success: true, data: divisions });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          const division = await MarksDivision.create(body);
          return NextResponse.json({ success: true, data: division }, { status: 201 });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }
}
