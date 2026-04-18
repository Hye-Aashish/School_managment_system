import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineExam extends Document {
    title: string;
    description: string;
    class: string;
    section: string;
    exam_from: Date;
    exam_to: Date;
    duration: string; // e.g., "01:30:00"
    attempts: number;
    is_published: boolean;
    result_published: boolean;
    questions: mongoose.Types.ObjectId[];
    created_at: Date;
}

const OnlineExamSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    class: { type: String },
    section: { type: String },
    exam_from: { type: Date, required: true },
    exam_to: { type: Date, required: true },
    duration: { type: String, required: true },
    attempts: { type: Number, default: 1 },
    is_published: { type: Boolean, default: false },
    result_published: { type: Boolean, default: false },
    questions: [{ type: Schema.Types.ObjectId, ref: "OnlineQuestion" }],
    created_at: { type: Date, default: Date.now },
});

const OnlineExam: Model<IOnlineExam> = mongoose.models.OnlineExam || mongoose.model<IOnlineExam>("OnlineExam", OnlineExamSchema);
export default OnlineExam;
