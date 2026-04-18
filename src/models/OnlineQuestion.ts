import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineQuestion extends Document {
    question: string;
    question_type: string; // Single Choice, Multiple Choice, Descriptive
    level: string; // Easy, Medium, Hard
    subject: string;
    class: string;
    section: string;
    options: string[];
    answer: string;
    created_by: string;
    created_at: Date;
}

const OnlineQuestionSchema: Schema = new Schema({
    question: { type: String, required: true },
    question_type: { type: String, required: true },
    level: { type: String, required: true },
    subject: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    options: { type: [String], default: [] },
    answer: { type: String },
    created_by: { type: String },
    created_at: { type: Date, default: Date.now },
});

const OnlineQuestion: Model<IOnlineQuestion> = mongoose.models.OnlineQuestion || mongoose.model<IOnlineQuestion>("OnlineQuestion", OnlineQuestionSchema);
export default OnlineQuestion;
