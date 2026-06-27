import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISMSTemplate extends Document {
    title: string;
    content: string;
    created_at: Date;
}

const SMSTemplateSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const SMSTemplate: Model<ISMSTemplate> = mongoose.models.SMSTemplate || mongoose.model<ISMSTemplate>("SMSTemplate", SMSTemplateSchema);
export default SMSTemplate;
