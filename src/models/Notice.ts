import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotice extends Document {
    title: string;
    noticeDate: string;
    publishOn: string;
    message: string;
    messageTo: string[]; // ["Student", "Parent", "Teacher", "Admin"]
    created_at: Date;
}

const NoticeSchema: Schema = new Schema({
    title: { type: String, required: true },
    noticeDate: { type: String, required: true },
    publishOn: { type: String },
    message: { type: String, required: true },
    messageTo: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now }
});

const Notice: Model<INotice> = mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);
export default Notice;
