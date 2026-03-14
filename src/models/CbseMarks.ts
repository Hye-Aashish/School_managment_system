import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseMarks extends Document {
    student: mongoose.Types.ObjectId;
    exam: mongoose.Types.ObjectId;
    marks: Map<string, {
        theory?: number;
        practical?: number;
        assignment?: number;
        total?: number;
    }>;
    created_at: Date;
}

const CbseMarksSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    exam: { type: Schema.Types.ObjectId, ref: "CbseExam", required: true },
    marks: {
        type: Map,
        of: {
            theory: { type: Number },
            practical: { type: Number },
            assignment: { type: Number },
            total: { type: Number },
        }
    },
    created_at: { type: Date, default: Date.now },
});

const CbseMarks: Model<ICbseMarks> = mongoose.models.CbseMarks || mongoose.model<ICbseMarks>("CbseMarks", CbseMarksSchema);
export default CbseMarks;
