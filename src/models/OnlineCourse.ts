import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineCourse extends Document {
    title: string;
    category: mongoose.Types.ObjectId;
    courseProvider: string;
    courseDescription?: string;
    price: number;
    currentPrice: number;
    thumbnailUrl?: string;
    created_at: Date;
    updated_at: Date;
}

const OnlineCourseSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "CourseCategory", required: true },
    courseProvider: { type: String, required: true },
    courseDescription: { type: String },
    price: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    thumbnailUrl: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const OnlineCourse: Model<IOnlineCourse> = mongoose.models.OnlineCourse || mongoose.model<IOnlineCourse>("OnlineCourse", OnlineCourseSchema);
export default OnlineCourse;
