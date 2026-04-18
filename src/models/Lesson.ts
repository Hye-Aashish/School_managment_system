import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILesson extends Document {
    name: string;
    class: string;
    section: string;
    subjectGroup: string;
    subject: string;
    created_at: Date;
}

const LessonSchema: Schema = new Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    subjectGroup: { type: String, required: true },
    subject: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Lesson: Model<ILesson> = mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", LessonSchema);
export default Lesson;
