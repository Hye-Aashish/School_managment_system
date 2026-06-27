/**
 * Firebase Admin SDK utility for sending push notifications.
 *
 * Requires: firebase-admin package and a service account JSON file at
 *   School_managment_system/firebase-service-account.json
 *
 * Install: npm install firebase-admin
 */

import * as admin from "firebase-admin";
import path from "path";
import fs from "fs";

let app: admin.app.App | null = null;

function getFirebaseAdminApp(): admin.app.App {
    if (app) return app;

    if (admin.apps.length > 0) {
        app = admin.apps[0]!;
        return app;
    }

    // Load service account from file
    const serviceAccountPath = path.join(
        process.cwd(),
        "firebase-service-account.json"
    );

    if (!fs.existsSync(serviceAccountPath)) {
        console.error(
            "[FCM] firebase-service-account.json not found at:",
            serviceAccountPath
        );
        throw new Error(
            "Firebase service account not found. Place firebase-service-account.json in the project root."
        );
    }

    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    return app;
}

export interface FcmPayload {
    title: string;
    body: string;
    data?: Record<string, string>;
    imageUrl?: string;
}

export interface FcmResult {
    successCount: number;
    failureCount: number;
    errors?: string[];
}

/**
 * Send a push notification to a list of FCM tokens (multicast).
 * Chunks tokens into batches of 500 (FCM limit).
 */
export async function sendToTokens(
    tokens: string[],
    payload: FcmPayload
): Promise<FcmResult> {
    if (tokens.length === 0) return { successCount: 0, failureCount: 0 };

    try {
        const adminApp = getFirebaseAdminApp();
        const messaging = adminApp.messaging();

        const BATCH_SIZE = 500;
        let successCount = 0;
        let failureCount = 0;
        const errors: string[] = [];

        // Process in batches
        for (let i = 0; i < tokens.length; i += BATCH_SIZE) {
            const batch = tokens.slice(i, i + BATCH_SIZE);

            const message: admin.messaging.MulticastMessage = {
                tokens: batch,
                notification: {
                    title: payload.title,
                    body: payload.body,
                    ...(payload.imageUrl ? { imageUrl: payload.imageUrl } : {}),
                },
                data: payload.data ?? {},
                android: {
                    priority: "high",
                    notification: {
                        sound: "default",
                        clickAction: "FLUTTER_NOTIFICATION_CLICK",
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: "default",
                            badge: 1,
                        },
                    },
                },
            };

            const response = await messaging.sendEachForMulticast(message);
            successCount += response.successCount;
            failureCount += response.failureCount;

            response.responses.forEach((resp, idx) => {
                if (!resp.success && resp.error) {
                    errors.push(`Token[${i + idx}]: ${resp.error.message}`);
                }
            });
        }

        console.log(
            `[FCM] Sent to ${tokens.length} tokens: ${successCount} success, ${failureCount} failed`
        );

        return { successCount, failureCount, errors };
    } catch (error: any) {
        console.error("[FCM] sendToTokens error:", error.message);
        return { successCount: 0, failureCount: tokens.length, errors: [error.message] };
    }
}

/**
 * Helper: send a notification to all students matching class/section/all.
 * Queries Student collection and extracts FCM tokens.
 */
export async function sendNotificationToStudents(opts: {
    targetType: "all" | "class" | "section" | "student";
    targetClass?: string;
    targetSection?: string;
    targetAdmissionNo?: string;
    payload: FcmPayload;
}): Promise<{ tokens: string[]; result: FcmResult }> {
    // Dynamic import to avoid circular deps
    const Student = (await import("@/models/Student")).default;

    const query: Record<string, string> = { status: "Active" };
    if (opts.targetType === "class" && opts.targetClass) {
        query.class = opts.targetClass;
    } else if (opts.targetType === "section" && opts.targetClass && opts.targetSection) {
        query.class = opts.targetClass;
        query.section = opts.targetSection;
    } else if (opts.targetType === "student" && opts.targetAdmissionNo) {
        query.admission_no = opts.targetAdmissionNo;
    }

    const students = await Student.find(query).select("fcm_tokens").lean();

    const tokens: string[] = [];
    for (const s of students as any[]) {
        if (s.fcm_tokens && Array.isArray(s.fcm_tokens)) {
            for (const t of s.fcm_tokens) {
                if (t.token) tokens.push(t.token);
            }
        }
    }

    const result = await sendToTokens(tokens, opts.payload);
    return { tokens, result };
}
