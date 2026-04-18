import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MarksheetTemplate from "@/models/MarksheetTemplate";

export const dynamic = "force-dynamic";

export async function GET() {
     try {
          await dbConnect();
          const templates = await MarksheetTemplate.find({}).sort({ createdAt: -1 });
          return NextResponse.json({ success: true, data: templates });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}

export async function POST(request: Request) {
     try {
          await dbConnect();
          const body = await request.json();
          const template = await MarksheetTemplate.create(body);
          return NextResponse.json({ success: true, data: template });
     } catch (error: any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
     }
}
