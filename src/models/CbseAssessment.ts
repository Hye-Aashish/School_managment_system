import mongoose, { Schema, Document, Model } from "mongoose";

interface IAssessmentType {
    name: string;
    code: string;
    maxMarks: number;
}

export interface ICbseAssessment extends Document {
    name: string;
    assessmentTypes: IAssessmentType[];
    created_at: Date;
}

const CbseAssessmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    assessmentTypes: [
        {
            name: { type: String, required: true },
            code: { type: String, required: true },
            maxMarks: { type: Number, required: true },
        }
    ],
    created_at: { type: Date, default: Date.now },
});

const CbseAssessment: Model<ICbseAssessment> = mongoose.models.CbseAssessment || mongoose.model<ICbseAssessment>("CbseAssessment", CbseAssessmentSchema);
export default CbseAssessment;
