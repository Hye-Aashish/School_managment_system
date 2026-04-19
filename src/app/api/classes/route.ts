import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Class from "@/models/Class";
import Section from "@/models/Section";
import { apiResponse } from "@/lib/response";

// GET: List all classes with sections
export async function GET() {
    await dbConnect();
    try {
        const classes = await Class.find({}).populate("sections").sort({ name: 1 });
        return apiResponse.success(classes);
    } catch (error: any) {
        console.error("API Error (Classes GET):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// POST: Add or Update class
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, name, sections } = body;
        if (!name) return apiResponse.badRequest("Name is required");

        if (id) {
            const updatedClass = await Class.findByIdAndUpdate(id, { name, sections }, { new: true });
            return apiResponse.success(updatedClass);
        } else {
            const newClass = await Class.create({ name, sections });
            return apiResponse.success(newClass);
        }
    } catch (error: any) {
        console.error("API Error (Classes POST):", error);
        if (error.code === 11000) {
            return apiResponse.error("Class already exists", 400);
        }
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// DELETE: Delete class
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return apiResponse.badRequest("ID is required");

        await Class.findByIdAndDelete(id);
        return apiResponse.success({ message: "Class deleted" });
    } catch (error: any) {
        console.error("API Error (Classes DELETE):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
