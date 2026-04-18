import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDownloadContentType extends Document {
    name: string;
}

const DownloadContentTypeSchema: Schema = new Schema({
    name: { type: String, required: true },
});

const DownloadContentType: Model<IDownloadContentType> = mongoose.models.DownloadContentType || mongoose.model<IDownloadContentType>("DownloadContentType", DownloadContentTypeSchema);
export default DownloadContentType;
