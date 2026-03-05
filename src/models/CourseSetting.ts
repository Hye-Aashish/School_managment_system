import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourseSetting extends Document {
    curriculum: {
        quiz: boolean;
        exam: boolean;
        assignment: boolean;
    };
    aws: {
        accessKeyId: string;
        secretAccessKey: string;
        bucketName: string;
        region: string;
    };
    guest: {
        guestLogin: string;
        guestUserPrefix: string;
        guestUserIdStartFrom: string;
    };
    updated_at: Date;
}

const CourseSettingSchema: Schema = new Schema({
    curriculum: {
        quiz: { type: Boolean, default: true },
        exam: { type: Boolean, default: true },
        assignment: { type: Boolean, default: true },
    },
    aws: {
        accessKeyId: { type: String, default: "" },
        secretAccessKey: { type: String, default: "" },
        bucketName: { type: String, default: "" },
        region: { type: String, default: "" },
    },
    guest: {
        guestLogin: { type: String, default: "enabled" },
        guestUserPrefix: { type: String, default: "Guest" },
        guestUserIdStartFrom: { type: String, default: "100" },
    },
    updated_at: { type: Date, default: Date.now },
});

const CourseSetting: Model<ICourseSetting> = mongoose.models.CourseSetting || mongoose.model<ICourseSetting>("CourseSetting", CourseSettingSchema);
export default CourseSetting;
