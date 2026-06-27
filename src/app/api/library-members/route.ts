import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import LibraryMember from "@/models/LibraryMember";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const memberType = searchParams.get("memberType");
        
        let query: any = { status: "Active" };
        if (memberType) query.memberType = memberType;

        const members = await LibraryMember.find(query).lean();
        return apiResponse.success(members);
    } catch (error: any) {
        console.error("API Error (LibraryMembers GET):", error);
        return apiResponse.error("Failed to retrieve library members", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { memberId, memberType } = body;

        if (!memberId || !memberType) {
            return apiResponse.badRequest("memberId and memberType are required");
        }

        // Check if member already exists and is active
        const existingMember = await LibraryMember.findOne({ memberId, status: "Active" });
        if (existingMember) {
            return apiResponse.error("User is already a library member", 400);
        }

        // Generate unique library card number
        const count = await LibraryMember.countDocuments();
        const libraryCardNo = `LIB-${1000 + count + 1}`;

        const newMember = await LibraryMember.create({
            memberId,
            memberType,
            libraryCardNo,
            status: "Active"
        });

        return apiResponse.success(newMember, 201);
    } catch (error: any) {
        console.error("API Error (LibraryMembers POST):", error);
        return apiResponse.error("Failed to add library member", 500, error.message);
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { memberId, action } = body;

        if (!memberId || action !== "return") {
            return apiResponse.badRequest("Invalid request");
        }

        const member = await LibraryMember.findOneAndUpdate(
            { memberId, status: "Active" },
            { status: "Returned" },
            { new: true }
        );

        if (!member) {
            return apiResponse.notFound("Active library member not found");
        }

        return apiResponse.success(member);
    } catch (error: any) {
        console.error("API Error (LibraryMembers PUT):", error);
        return apiResponse.error("Failed to update library member", 500, error.message);
    }
}
