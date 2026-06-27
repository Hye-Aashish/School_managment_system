import mongoose, { Schema, Document, Model } from "mongoose";

export type NotificationType =
    | "homework"
    | "lesson_plan"
    | "exam"
    | "download"
    | "live_class"
    | "course"
    | "behavior"
    | "cbse_exam"
    | "attendance"
    | "timetable"
    | "fees"
    | "notice"
    | "transport"
    | "library"
    | "custom";

export type TargetType = "all" | "class" | "section" | "student";

export interface INotification extends Document {
    title: string;
    message: string;
    type: NotificationType;
    route: string; // deep-link route for the app e.g. "/homework"
    targetType: TargetType;
    targetClass?: string;
    targetSection?: string;
    targetAdmissionNo?: string;
    sentBy?: string; // "system" | "admin"
    readBy: string[]; // array of admission_nos who have read
    recipientCount: number;
    createdAt: Date;
}

const NotificationSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: {
            type: String,
            enum: [
                "homework", "lesson_plan", "exam", "download",
                "live_class", "course", "behavior", "cbse_exam",
                "attendance", "timetable", "fees", "notice",
                "transport", "library", "custom",
            ],
            default: "custom",
        },
        route: { type: String, default: "/notifications" },
        targetType: { type: String, enum: ["all", "class", "section", "student"], default: "all" },
        targetClass: { type: String },
        targetSection: { type: String },
        targetAdmissionNo: { type: String },
        sentBy: { type: String, default: "admin" },
        readBy: [{ type: String }], // admission_no strings
        recipientCount: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const Notification: Model<INotification> =
    mongoose.models.Notification ||
    mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
