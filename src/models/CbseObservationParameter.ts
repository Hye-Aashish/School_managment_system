import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseObservationParameter extends Document {
    name: string;
    created_at: Date;
}

const CbseObservationParameterSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
});

const CbseObservationParameter: Model<ICbseObservationParameter> = mongoose.models.CbseObservationParameter || mongoose.model<ICbseObservationParameter>("CbseObservationParameter", CbseObservationParameterSchema);
export default CbseObservationParameter;
