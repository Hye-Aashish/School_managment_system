import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICommunicationLog extends Document {
    type: "Email" | "SMS";
    title: string;
    message: string;
    group: string;
    sent_at: Date;
}

const CommunicationLogSchema: Schema = new Schema({
    type: { type: String, enum: ["Email", "SMS"], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    group: { type: String, required: true },
    sent_at: { type: Date, default: Date.now }
});

const CommunicationLog: Model<ICommunicationLog> = mongoose.models.CommunicationLog || mongoose.model<ICommunicationLog>("CommunicationLog", CommunicationLogSchema);
export default CommunicationLog;
