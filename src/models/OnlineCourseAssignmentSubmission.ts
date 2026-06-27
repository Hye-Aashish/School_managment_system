import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineCourseAssignmentSubmission extends Document {
    course: mongoose.Types.ObjectId;
    itemId: string;
    student: mongoose.Types.ObjectId;
    message?: string;
    fileUrl?: string;
    fileName?: string;
    submittedAt: Date;
    status: "submitted" | "evaluated";
    evaluationDate?: Date;
    feedback?: string;
    marks?: number;
    evaluatedBy?: string;
}

const OnlineCourseAssignmentSubmissionSchema: Schema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "OnlineCourse", required: true },
    itemId: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    message: { type: String },
    fileUrl: { type: String },
    fileName: { type: String },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["submitted", "evaluated"], default: "submitted" },
    evaluationDate: { type: Date },
    feedback: { type: String },
    marks: { type: Number, min: 0, max: 100 },
    evaluatedBy: { type: String }
});

// Unique submission for a student per assignment item in a course
OnlineCourseAssignmentSubmissionSchema.index({ course: 1, itemId: 1, student: 1 }, { unique: true });

const OnlineCourseAssignmentSubmission: Model<IOnlineCourseAssignmentSubmission> =
    mongoose.models.OnlineCourseAssignmentSubmission ||
    mongoose.model<IOnlineCourseAssignmentSubmission>("OnlineCourseAssignmentSubmission", OnlineCourseAssignmentSubmissionSchema);

export default OnlineCourseAssignmentSubmission;
