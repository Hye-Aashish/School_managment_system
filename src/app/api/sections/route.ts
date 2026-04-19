import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Section from "@/models/Section";
import { apiResponse } from "@/lib/response";

// GET: List all sections
export async function GET() {
    await dbConnect();
    try {
        const sections = await Section.find({}).sort({ name: 1 });
        return apiResponse.success(sections);
    } catch (error: any) {
        console.error("API Error (Sections GET):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// POST: Add new section
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { name } = body;
        if (!name) return apiResponse.badRequest("Name is required");

        const section = await Section.create({ name });
        return apiResponse.success(section);
    } catch (error: any) {
        console.error("API Error (Sections POST):", error);
        if (error.code === 11000) {
            return apiResponse.error("Section already exists", 400);
        }
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// DELETE: Delete section
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return apiResponse.badRequest("ID is required");

        await Section.findByIdAndDelete(id);
        return apiResponse.success({ message: "Section deleted" });
    } catch (error: any) {
        console.error("API Error (Sections DELETE):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
