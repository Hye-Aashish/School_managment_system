import { NextRequest, NextResponse } from "next/server";
import { apiResponse } from "@/lib/response";
import dbConnect from "@/lib/mongodb";
import Staff from "@/models/Staff";
import Role from "@/models/Role";

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

        let userObj: any = null;

        // 1. Check SuperAdmin Master Credentials
        if (email === "admin@school.com" && password === "admin123") {
             userObj = { name: "System Admin", role: "SuperAdmin", email, permissions: ["*"] };
        } else {
             // 2. Check Staff Collection
             const staff = await Staff.findOne({ email }).select('+password').lean();
             if (!staff) {
                  return apiResponse.error("Invalid credentials. Personnel email not found.", 401);
             }

             // Compare passwords
             const storedPw = (staff as any).password;
             const isValidPassword = storedPw === password || (!storedPw && password === "staff123");
             if (!isValidPassword) {
                  return apiResponse.error("Invalid password.", 401);
             }

             if (staff.status === "Disabled") {
                  return apiResponse.error("Account deactivated. Please contact administrator.", 403);
             }

             // Fetch permissions for this staff member's role
             const roleDoc = await Role.findOne({ name: staff.role });
             const permissions = roleDoc ? roleDoc.permissions : [];

             userObj = {
                  name: `${staff.firstName} ${staff.lastName || ""}`.trim(),
                  role: staff.role,
                  email: staff.email,
                  permissions
             };
        }

        // 3. Serialize user session to Base64 token
        const token = Buffer.from(JSON.stringify(userObj)).toString("base64");

        const response = apiResponse.success({
             user: userObj,
             token
        });

        // SECURITY: Set HttpOnly Cookie for session protection
        response.cookies.set("auth_token", token, {
             httpOnly: true,
             secure: process.env.NODE_ENV === "production",
             sameSite: "strict",
             maxAge: 60 * 60 * 24, // 1 day
             path: "/"
        });

        return response;

    } catch (error: any) {
        console.error("Login API Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
