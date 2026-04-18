import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILessonPlan extends Document {
    lesson: string;
    topic: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    class: string;
    section: string;
    subjectGroup: string;
    subject: string;
    status: "Pending" | "Complete";
    created_at: Date;
}

const LessonPlanSchema: Schema = new Schema({
    lesson: { type: String, required: true },
    topic: { type: String, required: true },
    date: { type: String, required: true },
    timeFrom: { type: String },
    timeTo: { type: String },
    class: { type: String, required: true },
    section: { type: String, required: true },
    subjectGroup: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Complete"], default: "Pending" },
    created_at: { type: Date, default: Date.now }
});

const LessonPlan: Model<ILessonPlan> = mongoose.models.LessonPlan || mongoose.model<ILessonPlan>("LessonPlan", LessonPlanSchema);
export default LessonPlan;
