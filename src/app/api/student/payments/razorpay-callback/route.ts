import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import OnlineCourse from "@/models/OnlineCourse";
import StudentCourse from "@/models/StudentCourse";
import PaymentConfig from "@/models/PaymentConfig";
import OnlineCoursePayment from "@/models/OnlineCoursePayment";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Parse query parameters
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");
        const studentId = searchParams.get("studentId");

        if (!courseId || !studentId) {
            console.error("Callback missing courseId or studentId parameters.");
            return NextResponse.redirect(new URL("/payments/checkout?status=failed&error=Missing+course+or+student+context", req.url), 303);
        }

        // Validate course exists
        const course = await OnlineCourse.findById(courseId).lean();
        if (!course) {
            console.error("Callback course not found.");
            return NextResponse.redirect(new URL("/payments/checkout?status=failed&error=Course+not+found", req.url), 303);
        }

        // 2. Parse form body from Razorpay POST
        const formData = await req.formData();
        const razorpay_order_id = formData.get("razorpay_order_id") as string;
        const razorpay_payment_id = formData.get("razorpay_payment_id") as string;
        const razorpay_signature = formData.get("razorpay_signature") as string;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.error("Razorpay POST body missing required signature parameters.");
            return NextResponse.redirect(new URL(`/payments/checkout?status=failed&error=Signature+parameters+missing&courseId=${courseId}&studentId=${studentId}`, req.url), 303);
        }

        // Get Razorpay secret key
        const activeConfig = await PaymentConfig.findOne({ provider: "razorpay" }).lean();
        if (!activeConfig) {
            console.error("Razorpay configuration not found.");
            return NextResponse.redirect(new URL(`/payments/checkout?status=failed&error=Razorpay+configuration+missing&courseId=${courseId}&studentId=${studentId}`, req.url), 303);
        }

        const { keySecret } = activeConfig;

        // 3. Verify signature using HMAC-SHA256
        const generatedSignature = crypto
            .createHmac("sha256", keySecret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            console.error("Signature verification failed.");
            return NextResponse.redirect(new URL(`/payments/checkout?status=failed&error=Payment+signature+verification+failed&courseId=${courseId}&studentId=${studentId}`, req.url), 303);
        }

        // 4. Register/activate enrollment
        await StudentCourse.findOneAndUpdate(
            { student: studentId, course: courseId },
            { status: "Active", purchase_date: new Date(), completedItems: [] },
            { new: true, upsert: true }
        );

        // 5. Log payment in database
        try {
            await OnlineCoursePayment.create({
                student: studentId,
                course: courseId,
                amount: course.currentPrice,
                payment_date: new Date().toISOString().split("T")[0],
                reference_no: razorpay_payment_id,
                status: "Approved",
                note: "Purchased via Razorpay (WebView Callback)"
            });
        } catch (dbError) {
            console.error("Failed to save OnlineCoursePayment record:", dbError);
        }

        // Redirect back to checkout success page
        const successUrl = `/payments/checkout?status=success&courseId=${courseId}&courseTitle=${encodeURIComponent(course.title)}`;
        return NextResponse.redirect(new URL(successUrl, req.url), 303);

    } catch (error: any) {
        console.error("Razorpay Callback Error:", error);
        return NextResponse.redirect(new URL(`/payments/checkout?status=failed&error=${encodeURIComponent(error.message)}`, req.url), 303);
    }
}
