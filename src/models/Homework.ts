import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomework extends Document {
    class: string;
    section: string;
    subjectGroup: string;
    subject: string;
    homeworkDate: string;
    submissionDate: string;
    description: string;
    fileUrl: string;
    created_at: Date;
}

const HomeworkSchema: Schema = new Schema({
    class: { type: String, required: true },
    section: { type: String, required: true },
    subjectGroup: { type: String },
    subject: { type: String, required: true },
    homeworkDate: { type: String, required: true },
    submissionDate: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Homework: Model<IHomework> = mongoose.models.Homework || mongoose.model<IHomework>("Homework", HomeworkSchema);
export default Homework;
