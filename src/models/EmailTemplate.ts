import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmailTemplate extends Document {
    title: string;
    subject: string;
    content: string;
    created_at: Date;
}

const EmailTemplateSchema: Schema = new Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const EmailTemplate: Model<IEmailTemplate> = mongoose.models.EmailTemplate || mongoose.model<IEmailTemplate>("EmailTemplate", EmailTemplateSchema);
export default EmailTemplate;
