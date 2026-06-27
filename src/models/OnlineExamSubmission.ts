import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineExamSubmission extends Document {
    student: mongoose.Types.ObjectId;
    exam: mongoose.Types.ObjectId;
    score: number;
    answers: any[];
    attempt_no: number;
    submitted_at: Date;
}

const OnlineExamSubmissionSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    exam: { type: Schema.Types.ObjectId, ref: "OnlineExam", required: true },
    score: { type: Number, required: true },
    answers: { type: Array, default: [] },
    attempt_no: { type: Number, default: 1 },
    submitted_at: { type: Date, default: Date.now },
});

const OnlineExamSubmission: Model<IOnlineExamSubmission> = mongoose.models.OnlineExamSubmission || mongoose.model<IOnlineExamSubmission>("OnlineExamSubmission", OnlineExamSubmissionSchema);
export default OnlineExamSubmission;
