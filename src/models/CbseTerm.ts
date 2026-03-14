import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseTerm extends Document {
    name: string;
    code: string;
    description?: string;
    created_at: Date;
}

const CbseTermSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
});

const CbseTerm: Model<ICbseTerm> = mongoose.models.CbseTerm || mongoose.model<ICbseTerm>("CbseTerm", CbseTermSchema);
export default CbseTerm;
