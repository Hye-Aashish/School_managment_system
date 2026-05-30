import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Role from "@/models/Role";

export async function GET() {
    try {
        await dbConnect();
        const roles = await Role.find({}).sort({ created_at: -1 });
        return NextResponse.json({ success: true, data: roles });
    } catch (error: any) {
        console.error("API Error (Roles GET):", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        if (!body.name) {
            return NextResponse.json({ success: false, error: "Role name is required" }, { status: 400 });
        }
        const existing = await Role.findOne({ name: body.name });
        if (existing) {
            return NextResponse.json({ success: false, error: "Role name already exists" }, { status: 400 });
        }
        const role = await Role.create(body);
        return NextResponse.json({ success: true, data: role }, { status: 201 });
    } catch (error: any) {
        console.error("API Error (Roles POST):", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
