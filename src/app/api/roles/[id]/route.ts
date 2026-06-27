import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Role from "@/models/Role";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const text = await req.text();
        const body = text ? JSON.parse(text) : {};
        const role = await Role.findByIdAndUpdate(id, body, { new: true });
        if (!role) {
            return NextResponse.json({ success: false, error: "Role not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: role });
    } catch (error: any) {
        console.error("API Error (Roles PUT):", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const role = await Role.findByIdAndDelete(id);
        if (!role) {
            return NextResponse.json({ success: false, error: "Role not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Role deleted successfully" });
    } catch (error: any) {
        console.error("API Error (Roles DELETE):", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
