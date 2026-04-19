import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import SubjectGroup from "@/models/SubjectGroup";
import Class from "@/models/Class";
import Section from "@/models/Section";
import Subject from "@/models/Subject";
import { apiResponse } from "@/lib/response";

// GET: List all subject groups with optional filtering
export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const className = searchParams.get("class");
        const sectionName = searchParams.get("section");

        let query: any = {};
        
        // Find by class name if provided
        if (className) {
            const classDoc = await Class.findOne({ name: className });
            if (classDoc) query.class = classDoc._id;
        }

        const groups = await SubjectGroup.find(query)
            .populate("class")
            .populate("sections")
            .populate("subjects")
            .sort({ name: 1 })
            .lean();

        // Frontend also filters by section name if provided
        let filteredGroups = groups;
        if (sectionName) {
            filteredGroups = groups.filter((g: any) => 
                g.sections.some((s: any) => s.name === sectionName)
            );
        }

        return apiResponse.success(filteredGroups);
    } catch (error: any) {
        console.error("API Error (SubjectGroups GET):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// POST: Add or Update subject group
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, name, classId, sections, subjects, description } = body;
        if (!name || !classId) return apiResponse.badRequest("Name and Class are required");

        const payload = {
            name,
            class: classId,
            sections,
            subjects,
            description
        };

        if (id) {
            const updatedGroup = await SubjectGroup.findByIdAndUpdate(id, payload, { new: true });
            return apiResponse.success(updatedGroup);
        } else {
            const newGroup = await SubjectGroup.create(payload);
            return apiResponse.success(newGroup);
        }
    } catch (error: any) {
        console.error("API Error (SubjectGroups POST):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

// DELETE: Delete subject group
export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return apiResponse.badRequest("ID is required");

        await SubjectGroup.findByIdAndDelete(id);
        return apiResponse.success({ message: "Subject Group deleted" });
    } catch (error: any) {
        console.error("API Error (SubjectGroups DELETE):", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
