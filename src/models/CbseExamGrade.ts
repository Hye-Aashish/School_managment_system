import mongoose, { Schema, Document, Model } from "mongoose";

interface IGrade {
    grade: string;
    minMarks: number;
    maxMarks: number;
    description?: string;
}

export interface ICbseExamGrade extends Document {
    name: string;
    grades: IGrade[];
    created_at: Date;
}

const CbseExamGradeSchema: Schema = new Schema({
    name: { type: String, required: true },
    grades: [
        {
            grade: { type: String, required: true },
            minMarks: { type: Number, required: true },
            maxMarks: { type: Number, required: true },
            description: { type: String },
        }
    ],
    created_at: { type: Date, default: Date.now },
});

const CbseExamGrade: Model<ICbseExamGrade> = mongoose.models.CbseExamGrade || mongoose.model<ICbseExamGrade>("CbseExamGrade", CbseExamGradeSchema);
export default CbseExamGrade;
