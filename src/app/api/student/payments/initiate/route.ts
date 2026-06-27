import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import OnlineCourse from "@/models/OnlineCourse";
import StudentCourse from "@/models/StudentCourse";
import PaymentConfig from "@/models/PaymentConfig";
import Student from "@/models/Student";

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
        const { courseId } = body;

        if (!courseId) {
            return apiResponse.badRequest("courseId is required");
        }

        // 2. Validate course exists
        const course = await OnlineCourse.findById(courseId).lean();
        if (!course) {
            return apiResponse.error("Course not found", 404);
        }

        // 3. Check if already active
        const existingEnrollment = await StudentCourse.findOne({
            student: sessionUser.id,
            course: courseId,
            status: "Active"
        }).lean();

        if (existingEnrollment) {
            return apiResponse.badRequest("You are already enrolled in this course");
        }

        // 4. Handle free course directly
        if (course.freeCourse || course.currentPrice === 0) {
            await StudentCourse.findOneAndUpdate(
                { student: sessionUser.id, course: courseId },
                { status: "Active", purchase_date: new Date(), completedItems: [] },
                { new: true, upsert: true }
            );
            return apiResponse.success({ enrolled: true, provider: "none" });
        }

        // 5. Get active payment config
        const activeConfig = await PaymentConfig.findOne({ enabled: true }).lean();
        if (!activeConfig) {
            return apiResponse.error("No active online payment gateway configured.", 400);
        }

        const { provider, keyId, keySecret } = activeConfig;
        let sandbox = activeConfig.sandbox;
        if (provider === "cashfree" && keyId.startsWith("TEST")) {
            sandbox = true;
        }
        if (!keyId || !keySecret) {
            return apiResponse.error("Active payment gateway credentials not set.", 400);
        }

        // Get full student details for customer data prefill
        const studentDoc = await Student.findById(sessionUser.id).lean();

        // Compute base URL dynamically for mock checkouts
        const host = req.headers.get("host") || "localhost:3000";
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const baseUrl = `${protocol}://${host}`;

        if (provider === "razorpay") {
            try {
                // Initiate Razorpay Order
                const rzpUrl = "https://api.razorpay.com/v1/orders";
                const authHeader = `Basic ${Buffer.from(keyId + ":" + keySecret).toString("base64")}`;

                const response = await fetch(rzpUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": authHeader,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Math.round(course.currentPrice * 100), // in paise
                        currency: "INR",
                        receipt: `rcpt_${courseId.substring(0, 6)}_${sessionUser.id.substring(0, 6)}_${Date.now()}`
                    }),
                    signal: AbortSignal.timeout(8000) // 8 seconds timeout
                });

                if (!response.ok) {
                    const rzpError = await response.text();
                    throw new Error(rzpError);
                }

                const rzpOrder = await response.json();
                return apiResponse.success({
                    enrolled: false,
                    provider: "razorpay",
                    orderId: rzpOrder.id,
                    amount: rzpOrder.amount,
                    currency: rzpOrder.currency,
                    keyId: keyId,
                    courseTitle: course.title,
                    studentId: sessionUser.id
                });
            } catch (err: any) {
                console.error("Razorpay Order Creation Failed, falling back to mock:", err.message);
                if (sandbox || process.env.NODE_ENV === "development") {
                    const mockOrderId = `mock_rzp_${courseId.substring(0, 8)}_${sessionUser.id.substring(0, 8)}_${Date.now()}`;
                    return apiResponse.success({
                        enrolled: false,
                        provider: "razorpay",
                        orderId: mockOrderId,
                        amount: Math.round(course.currentPrice * 100),
                        currency: "INR",
                        keyId: keyId || "mock_key_id",
                        courseTitle: course.title,
                        isMock: true,
                        mockReason: `Razorpay error: ${err.message}`
                    });
                }
                return apiResponse.error("Failed to connect to Razorpay payment gateway", 500, err.message);
            }

        } else if (provider === "cashfree") {
            try {
                // Initiate Cashfree Order
                const cfUrl = sandbox 
                    ? "https://sandbox.cashfree.com/pg/orders" 
                    : "https://api.cashfree.com/pg/orders";

                const headers = {
                    "x-client-id": keyId,
                    "x-client-secret": keySecret,
                    "x-api-version": "2023-08-01",
                    "Content-Type": "application/json"
                };

                // Sanitize and validate customer details for Cashfree API
                let customerPhone = (studentDoc?.mobile || "").replace(/\D/g, "");
                if (customerPhone.length < 10 || customerPhone.length > 15) {
                    customerPhone = "9999999999";
                }
                let customerEmail = studentDoc?.email || sessionUser.email || "student@school.com";
                if (!customerEmail.includes("@")) {
                    customerEmail = "student@school.com";
                }
                const studentName = studentDoc ? `${studentDoc.fname} ${studentDoc.lname || ""}`.trim() : sessionUser.name;
                const customerName = studentName || "Student Portal User";
 
                const orderId = `order_${courseId.substring(0, 8)}_${sessionUser.id.substring(0, 8)}_${Date.now()}`;
                const response = await fetch(cfUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        order_id: orderId,
                        order_amount: Number(course.currentPrice),
                        order_currency: "INR",
                        customer_details: {
                            customer_id: sessionUser.id,
                            customer_phone: customerPhone,
                            customer_email: customerEmail,
                            customer_name: customerName
                        },
                        order_meta: {
                            return_url: `${baseUrl}/payments/cashfree-checkout?status=redirect&orderId=${orderId}&courseId=${courseId}&courseTitle=${encodeURIComponent(course.title)}`
                        }
                    }),
                    signal: AbortSignal.timeout(8000) // 8 seconds timeout
                });
 
                if (!response.ok) {
                    const cfError = await response.text();
                    throw new Error(cfError);
                }
 
                const cfOrder = await response.json();
                const paymentLink = `${baseUrl}/payments/cashfree-checkout?paymentSessionId=${cfOrder.payment_session_id}&orderId=${cfOrder.order_id}&courseId=${courseId}&amount=${course.currentPrice}&courseTitle=${encodeURIComponent(course.title)}&sandbox=${sandbox}`;
                return apiResponse.success({
                    enrolled: false,
                    provider: "cashfree",
                    orderId: cfOrder.order_id,
                    paymentLink: paymentLink
                });
            } catch (err: any) {
                console.error("Cashfree Order Creation Failed, falling back to mock:", err.message);
                if (sandbox || process.env.NODE_ENV === "development") {
                    const mockOrderId = `mock_cf_${courseId.substring(0, 8)}_${sessionUser.id.substring(0, 8)}_${Date.now()}`;
                    const mockPaymentLink = `${baseUrl}/payments/mock-checkout?orderId=${mockOrderId}&courseId=${course._id.toString()}&amount=${course.currentPrice}&courseTitle=${encodeURIComponent(course.title)}`;
                    return apiResponse.success({
                        enrolled: false,
                        provider: "cashfree",
                        orderId: mockOrderId,
                        paymentLink: mockPaymentLink,
                        isMock: true,
                        mockReason: `Cashfree error: ${err.message}`
                    });
                }
                return apiResponse.error("Failed to connect to Cashfree payment gateway", 500, err.message);
            }
        }

        return apiResponse.error("Unsupported gateway provider", 400);

    } catch (error: any) {
        console.error("Student Payment Initiate Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
