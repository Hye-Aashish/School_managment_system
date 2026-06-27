import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import OnlineCourse from "@/models/OnlineCourse";
import StudentCourse from "@/models/StudentCourse";
import PaymentConfig from "@/models/PaymentConfig";
import OnlineCoursePayment from "@/models/OnlineCoursePayment";
import crypto from "crypto";

export async function POST(req: NextRequest) {
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

        let sessionUser: any = null;
        try {
            sessionUser = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        } catch (e) {
            return apiResponse.error("Invalid session", 401);
        }

        const body = await req.json();
        const { orderId, courseId, provider, razorpay_payment_id, razorpay_signature } = body;

        if (!orderId || !courseId || !provider) {
            return apiResponse.badRequest("orderId, courseId, and provider are required");
        }

        // Validate course exists
        const course = await OnlineCourse.findById(courseId).lean();
        if (!course) {
            return apiResponse.error("Course not found", 404);
        }

        // Check if mock order (simulated sandbox checkout)
        if (orderId.startsWith("mock_")) {
            const { isMockSuccessClick } = body;

            if (isMockSuccessClick) {
                await StudentCourse.findOneAndUpdate(
                    { student: sessionUser.id, course: courseId },
                    { status: "Active", purchase_date: new Date(), completedItems: [] },
                    { new: true, upsert: true }
                );

                try {
                    await OnlineCoursePayment.create({
                        student: sessionUser.id,
                        course: courseId,
                        amount: course.currentPrice,
                        payment_date: new Date().toISOString().split("T")[0],
                        reference_no: orderId,
                        status: "Approved",
                        note: `Simulated Sandbox Purchase (${provider.toUpperCase()})`
                    });
                } catch (dbError) {
                    console.error("Failed to save OnlineCoursePayment record:", dbError);
                }

                return apiResponse.success({ success: true, enrolled: true });
            } else {
                // Background poll check: verify if the enrollment is already Active (meaning success was clicked)
                const activeEnrollment = await StudentCourse.findOne({
                    student: sessionUser.id,
                    course: courseId,
                    status: "Active"
                }).lean();

                if (activeEnrollment) {
                    return apiResponse.success({ success: true, enrolled: true });
                } else {
                    return apiResponse.success({ success: false, enrolled: false, status: "PENDING" });
                }
            }
        }

        // Get payment config
        const activeConfig = await PaymentConfig.findOne({ provider }).lean();
        if (!activeConfig) {
            return apiResponse.error(`Configuration for provider ${provider} not found`, 400);
        }

        const { keyId, keySecret } = activeConfig;
        let sandbox = activeConfig.sandbox;
        if (provider === "cashfree" && keyId.startsWith("TEST")) {
            sandbox = true;
        }
        let isVerified = false;

        if (provider === "razorpay") {
            if (!razorpay_payment_id || !razorpay_signature) {
                // Background poll: Check if the enrollment is already Active (verified by callback page)
                const activeEnrollment = await StudentCourse.findOne({
                    student: sessionUser.id,
                    course: courseId,
                    status: "Active"
                }).lean();

                if (activeEnrollment) {
                    return apiResponse.success({ success: true, enrolled: true });
                }

                // Query Razorpay API directly for order status (in case user completed payment but callback failed/is pending)
                try {
                    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
                    const rzpRes = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Basic ${auth}`
                        }
                    });

                    if (rzpRes.ok) {
                        const rzpOrder = await rzpRes.json();
                        if (rzpOrder.status === "paid") {
                            // Automatically activate enrollment
                            await StudentCourse.findOneAndUpdate(
                                { student: sessionUser.id, course: courseId },
                                { status: "Active", purchase_date: new Date(), completedItems: [] },
                                { new: true, upsert: true }
                            );

                            try {
                                await OnlineCoursePayment.create({
                                    student: sessionUser.id,
                                    course: courseId,
                                    amount: course.currentPrice,
                                    payment_date: new Date().toISOString().split("T")[0],
                                    reference_no: orderId,
                                    status: "Approved",
                                    note: "Purchased via Razorpay (Auto-verified background poll)"
                                });
                            } catch (dbError) {
                                console.error("Failed to save OnlineCoursePayment record:", dbError);
                            }

                            return apiResponse.success({ success: true, enrolled: true });
                        }
                    } else {
                        const errText = await rzpRes.text();
                        console.error("Razorpay Fetch Order Status Failed:", errText);
                    }
                } catch (apiError) {
                    console.error("Razorpay Order Status check error:", apiError);
                }

                return apiResponse.success({ success: false, enrolled: false, status: "PENDING" });
            }

            // Verify signature using HMAC-SHA256
            const generatedSignature = crypto
                .createHmac("sha256", keySecret)
                .update(orderId + "|" + razorpay_payment_id)
                .digest("hex");

            if (generatedSignature === razorpay_signature) {
                isVerified = true;
            }
        } else if (provider === "cashfree") {
            // Verify Cashfree payment status
            const cfUrl = sandbox
                ? `https://sandbox.cashfree.com/pg/orders/${orderId}`
                : `https://api.cashfree.com/pg/orders/${orderId}`;

            const headers = {
                "x-client-id": keyId,
                "x-client-secret": keySecret,
                "x-api-version": "2023-08-01"
            };

            const response = await fetch(cfUrl, {
                method: "GET",
                headers: headers
            });

            if (!response.ok) {
                const cfError = await response.text();
                console.error("Cashfree Order Status Verification Failed:", cfError);
                return apiResponse.error("Failed to verify order status with Cashfree", 500, cfError);
            }

            const cfOrder = await response.json();
            if (cfOrder.order_status === "PAID") {
                isVerified = true;
            }
        }

        if (!isVerified) {
            return apiResponse.error("Payment verification failed. Unsuccessful transaction.", 400);
        }

        // 2. Register/activate enrollment
        await StudentCourse.findOneAndUpdate(
            { student: sessionUser.id, course: courseId },
            { status: "Active", purchase_date: new Date(), completedItems: [] },
            { new: true, upsert: true }
        );

        // 3. Log payment in database
        try {
            await OnlineCoursePayment.create({
                student: sessionUser.id,
                course: courseId,
                amount: course.currentPrice,
                payment_date: new Date().toISOString().split("T")[0],
                reference_no: razorpay_payment_id || orderId,
                status: "Approved",
                note: `Purchased via ${provider.toUpperCase()}`
            });
        } catch (dbError) {
            // Log log error but don't fail transaction if logging fails
            console.error("Failed to save OnlineCoursePayment record:", dbError);
        }

        return apiResponse.success({ success: true, enrolled: true });

    } catch (error: any) {
        console.error("Student Payment Verify Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
