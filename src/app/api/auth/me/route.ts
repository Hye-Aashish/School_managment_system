import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("auth_token")?.value;
        if (!token) {
            return apiResponse.error("Not authenticated", 401);
        }

        let userObj: any = null;
        try {
            userObj = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        } catch (e) {
            // Support legacy token if present
            if (token === "secure-admin-session-token") {
                userObj = { email: "admin@school.com", name: "System Admin", role: "SuperAdmin" };
            } else {
                return apiResponse.error("Invalid session", 401);
            }
        }

        return apiResponse.success(userObj);
    } catch (error: any) {
        console.error("Auth Me API Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
