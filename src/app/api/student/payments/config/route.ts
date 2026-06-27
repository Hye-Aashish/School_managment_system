import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import PaymentConfig from "@/models/PaymentConfig";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Authenticate user from session token
        let token = req.cookies.get("auth_token")?.value;
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return apiResponse.error("Not authenticated", 401);
        }

        try {
            JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        } catch (e) {
            return apiResponse.error("Invalid session", 401);
        }

        // 2. Fetch the enabled payment gateway configuration
        const activeConfig = await PaymentConfig.findOne({ enabled: true }).lean();
        if (!activeConfig) {
            return apiResponse.success({ provider: "none", enabled: false });
        }

        return apiResponse.success({
            provider: activeConfig.provider,
            enabled: true,
            keyId: activeConfig.keyId,
            sandbox: activeConfig.sandbox
        });

    } catch (error: any) {
        console.error("Student Payment Config GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
