import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseExamSchedule extends Document {
    exam: mongoose.Types.ObjectId;
    subject: string;
    date: string;
    time: string;
    duration: string;
    roomNo: string;
    maxMarks: number;
    minMarks: number;
    created_at: Date;
}

const CbseExamScheduleSchema: Schema = new Schema({
    exam: { type: Schema.Types.ObjectId, ref: "CbseExam", required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    roomNo: { type: String, required: true },
    maxMarks: { type: Number, required: true },
    minMarks: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});

const CbseExamSchedule: Model<ICbseExamSchedule> = mongoose.models.CbseExamSchedule || mongoose.model<ICbseExamSchedule>("CbseExamSchedule", CbseExamScheduleSchema);
export default CbseExamSchedule;
