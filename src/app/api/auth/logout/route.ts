import { NextResponse } from "next/server";
import { apiResponse } from "@/lib/response";

export async function POST() {
    try {
        const response = apiResponse.success({ message: "Logged out successfully" });

        // SECURITY: Clear the session cookie
        response.cookies.set("auth_token", "", {
            httpOnly: true,
            expires: new Date(0),
            path: "/"
        });

        return response;
    } catch (error) {
        return apiResponse.error("Logout failed", 500);
    }
}
