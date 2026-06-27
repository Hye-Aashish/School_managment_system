import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import { apiResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    try {
        let token = req.cookies.get("auth_token")?.value;

        // Fallback to Bearer token if cookie is not present
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return apiResponse.error("Not authenticated", 401);
        }

        let userObj: any = null;
        try {
            userObj = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        } catch (e) {
            return apiResponse.error("Invalid session", 401);
        }

        if (userObj.role !== "Student") {
            return apiResponse.error("Access restricted to student accounts.", 403);
        }

        return apiResponse.success(userObj);
    } catch (error: any) {
        console.error("Student Session Verification Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
