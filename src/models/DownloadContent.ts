import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDownloadContent extends Document {
    title: string;
    type: string;
    shareDate: string;
    description: string;
    fileUrl: string;
    availableFor: string[]; // ["Student", "Staff"]
    class: string;
    section: string;
    created_at: Date;
}

const DownloadContentSchema: Schema = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    shareDate: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String },
    availableFor: { type: [String], default: [] },
    class: { type: String },
    section: { type: String },
    created_at: { type: Date, default: Date.now }
});

const DownloadContent: Model<IDownloadContent> = mongoose.models.DownloadContent || mongoose.model<IDownloadContent>("DownloadContent", DownloadContentSchema);
export default DownloadContent;
