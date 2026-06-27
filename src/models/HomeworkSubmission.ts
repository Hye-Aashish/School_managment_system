import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomeworkSubmission extends Document {
    homework: mongoose.Types.ObjectId;
    student: mongoose.Types.ObjectId;
    message?: string;
    fileUrl?: string;
    fileName?: string;
    submittedAt: Date;
    status: "submitted" | "evaluated";
    evaluationDate?: Date;
    feedback?: string;
    grade?: string;
    evaluatedBy?: string;
}

const HomeworkSubmissionSchema: Schema = new Schema({
    homework: { type: Schema.Types.ObjectId, ref: "Homework", required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    message: { type: String },
    fileUrl: { type: String },
    fileName: { type: String },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["submitted", "evaluated"], default: "submitted" },
    evaluationDate: { type: Date },
    feedback: { type: String },
    grade: { type: String },
    evaluatedBy: { type: String }
});

// Ensure a student can submit only once per homework (or updates their previous submission)
HomeworkSubmissionSchema.index({ homework: 1, student: 1 }, { unique: true });

const HomeworkSubmission: Model<IHomeworkSubmission> =
    mongoose.models.HomeworkSubmission ||
    mongoose.model<IHomeworkSubmission>("HomeworkSubmission", HomeworkSubmissionSchema);

export default HomeworkSubmission;
