import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseExam extends Document {
    name: string;
    term: mongoose.Types.ObjectId;
    examGrade: mongoose.Types.ObjectId;
    assessment: mongoose.Types.ObjectId;
    description?: string;
    status: string; // "Active", "Inactive", etc.
    created_at: Date;
}

const CbseExamSchema: Schema = new Schema({
    name: { type: String, required: true },
    term: { type: Schema.Types.ObjectId, ref: "CbseTerm", required: true },
    examGrade: { type: Schema.Types.ObjectId, ref: "CbseExamGrade", required: true },
    assessment: { type: Schema.Types.ObjectId, ref: "CbseAssessment", required: true },
    description: { type: String },
    status: { type: String, default: "Active" },
    created_at: { type: Date, default: Date.now },
});

const CbseExam: Model<ICbseExam> = mongoose.models.CbseExam || mongoose.model<ICbseExam>("CbseExam", CbseExamSchema);
export default CbseExam;
