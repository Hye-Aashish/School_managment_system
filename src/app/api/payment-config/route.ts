import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import PaymentConfig from "@/models/PaymentConfig";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const isAdmin = searchParams.get("admin") === "true";

        const configs = await PaymentConfig.find({}).lean();
        
        // Hide secret keys for security if it's a public client request
        const result = configs.map(config => {
            if (isAdmin) {
                return config;
            }
            return {
                provider: config.provider,
                enabled: config.enabled,
                keyId: config.keyId,
                sandbox: config.sandbox
            };
        });

        return apiResponse.success(result);
    } catch (error: any) {
        console.error("Payment Config GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        
        const body = await req.json();
        const { provider, enabled, keyId, keySecret, sandbox } = body;

        if (!provider || !["razorpay", "cashfree"].includes(provider)) {
            return apiResponse.badRequest("Invalid or missing provider name");
        }

        const updatedConfig = await PaymentConfig.findOneAndUpdate(
            { provider },
            { 
                enabled: !!enabled, 
                keyId: keyId || "", 
                keySecret: keySecret || "", 
                sandbox: !!sandbox,
                updated_at: new Date()
            },
            { new: true, upsert: true }
        );

        return apiResponse.success(updatedConfig);
    } catch (error: any) {
        console.error("Payment Config POST Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
