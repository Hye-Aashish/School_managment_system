import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseAssignObservation extends Document {
    observation: mongoose.Types.ObjectId;
    term: mongoose.Types.ObjectId;
    code: string;
    description?: string;
    created_at: Date;
}

const CbseAssignObservationSchema: Schema = new Schema({
    observation: { type: Schema.Types.ObjectId, ref: "CbseObservation", required: true },
    term: { type: Schema.Types.ObjectId, ref: "CbseTerm", required: true },
    code: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
});

const CbseAssignObservation: Model<ICbseAssignObservation> = mongoose.models.CbseAssignObservation || mongoose.model<ICbseAssignObservation>("CbseAssignObservation", CbseAssignObservationSchema);
export default CbseAssignObservation;
