import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourseQuestion extends Document {
    question: string;
    type: string;
    level: string;
    subject: string;
    options: string[];
    answer: string;
    created_at: Date;
}

const CourseQuestionSchema: Schema = new Schema({
    question: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: String, required: true },
    subject: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const CourseQuestion: Model<ICourseQuestion> = mongoose.models.CourseQuestion || mongoose.model<ICourseQuestion>("CourseQuestion", CourseQuestionSchema);
export default CourseQuestion;
