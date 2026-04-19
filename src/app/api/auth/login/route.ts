import { NextRequest, NextResponse } from "next/server";
import { apiResponse } from "@/lib/response";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, password, botCheck } = body;

        // Security: Bot Honeypot
        if (botCheck) {
            return apiResponse.error("Bot activity detected", 403);
        }

        if (!email || !password) {
            return apiResponse.badRequest("Email and password are required");
        }

        // VALIDATION: In a real app, you would check the database here.
        // For now, we'll allow 'admin@school.com' / 'admin123' as a master account
        // and any valid-looking input for demo purposes, but it's now a real API route.
        if (email === "admin@school.com" && password === "admin123") {
             const response = apiResponse.success({
                 user: { name: "System Admin", role: "SuperAdmin", email },
                 token: "secure-admin-session-token"
             });

             // SECURITY: Set HttpOnly Cookie for session protection
             response.cookies.set("auth_token", "secure-admin-session-token", {
                 httpOnly: true,
                 secure: process.env.NODE_ENV === "production",
                 sameSite: "strict",
                 maxAge: 60 * 60 * 24, // 1 day
                 path: "/"
             });

             return response;
        }

        return apiResponse.error("Invalid credentials. Please use the correct Admin email and password.", 401);

    } catch (error: any) {
        console.error("Login API Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
