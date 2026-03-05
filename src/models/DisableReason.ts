import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDisableReason extends Document {
    reason: string;
}

const DisableReasonSchema: Schema = new Schema({
    reason: { type: String, required: true, unique: true },
});

const DisableReason: Model<IDisableReason> = mongoose.models.DisableReason || mongoose.model<IDisableReason>("DisableReason", DisableReasonSchema);
export default DisableReason;
