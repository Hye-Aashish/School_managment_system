import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import StaffLeave from "@/models/StaffLeave";
import Staff from "@/models/Staff";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const leaves = await StaffLeave.find().populate("staff", "firstName lastName staffId").sort({ created_at: -1 }).lean();
        return apiResponse.success(leaves);
    } catch (error: any) {
        console.error("StaffLeave GET Error:", error);
        return apiResponse.error("Failed to retrieve staff leave requests", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.staff || !body.leaveType || !body.fromDate || !body.toDate || !body.days) {
            return apiResponse.badRequest("Missing required fields for leave request");
        }

        const newLeave = await StaffLeave.create(body);
        const populatedLeave = await StaffLeave.findById(newLeave._id).populate("staff", "firstName lastName staffId").lean();

        return apiResponse.success(populatedLeave, 201);
    } catch (error: any) {
        console.error("StaffLeave POST Error:", error);
        return apiResponse.error("Failed to create staff leave request", 500, error.message);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.id || !body.status) {
            return apiResponse.badRequest("Missing leave request ID or status");
        }

        const updatedLeave = await StaffLeave.findByIdAndUpdate(
            body.id,
            { status: body.status },
            { new: true }
        ).populate("staff", "firstName lastName staffId").lean();

        if (!updatedLeave) {
            return apiResponse.notFound("Leave request not found");
        }

        return apiResponse.success(updatedLeave);
    } catch (error: any) {
        console.error("StaffLeave PUT Error:", error);
        return apiResponse.error("Failed to update staff leave request status", 500, error.message);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return apiResponse.badRequest("Missing leave request ID");
        }

        const deletedLeave = await StaffLeave.findByIdAndDelete(id);

        if (!deletedLeave) {
            return apiResponse.notFound("Leave request not found");
        }

        return apiResponse.success({ message: "Leave request deleted successfully" });
    } catch (error: any) {
        console.error("StaffLeave DELETE Error:", error);
        return apiResponse.error("Failed to delete staff leave request", 500, error.message);
    }
}
