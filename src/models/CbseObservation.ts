import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseObservation extends Document {
    name: string;
    parameters: {
        parameter: mongoose.Types.ObjectId;
        maxMarks: number;
    }[];
    description?: string;
    created_at: Date;
}

const CbseObservationSchema: Schema = new Schema({
    name: { type: String, required: true },
    parameters: [
        {
            parameter: { type: Schema.Types.ObjectId, ref: "CbseObservationParameter", required: true },
            maxMarks: { type: Number, required: true },
        },
    ],
    description: { type: String },
    created_at: { type: Date, default: Date.now },
});

const CbseObservation: Model<ICbseObservation> = mongoose.models.CbseObservation || mongoose.model<ICbseObservation>("CbseObservation", CbseObservationSchema);
export default CbseObservation;
