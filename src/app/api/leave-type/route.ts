import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import LeaveType from "@/models/LeaveType";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const leaveTypes = await LeaveType.find().sort({ created_at: -1 }).lean();
        return apiResponse.success(leaveTypes);
    } catch (error: any) {
        console.error("LeaveType GET Error:", error);
        return apiResponse.error("Failed to fetch leave types", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.name) {
            return apiResponse.badRequest("Name is required");
        }

        const newLeaveType = await LeaveType.create({ name: body.name });
        return apiResponse.success(newLeaveType, 201);
    } catch (error: any) {
        console.error("LeaveType POST Error:", error);
        return apiResponse.error("Failed to create leave type", 500, error.message);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.id || !body.name) {
            return apiResponse.badRequest("ID and name are required");
        }

        const updatedLeaveType = await LeaveType.findByIdAndUpdate(
            body.id,
            { name: body.name },
            { new: true }
        ).lean();

        if (!updatedLeaveType) {
            return apiResponse.notFound("Leave type not found");
        }

        return apiResponse.success(updatedLeaveType);
    } catch (error: any) {
        console.error("LeaveType PUT Error:", error);
        return apiResponse.error("Failed to update leave type", 500, error.message);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return apiResponse.badRequest("ID is required");
        }

        const deletedLeaveType = await LeaveType.findByIdAndDelete(id);

        if (!deletedLeaveType) {
            return apiResponse.notFound("Leave type not found");
        }

        return apiResponse.success({ message: "Leave type deleted successfully" });
    } catch (error: any) {
        console.error("LeaveType DELETE Error:", error);
        return apiResponse.error("Failed to delete leave type", 500, error.message);
    }
}
