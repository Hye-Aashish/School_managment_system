import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITopic extends Document {
    name: string;
    lesson: string; // Internal name or ID
    class: string;
    section: string;
    subjectGroup: string;
    subject: string;
    created_at: Date;
}

const TopicSchema: Schema = new Schema({
    name: { type: String, required: true },
    lesson: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    subjectGroup: { type: String, required: true },
    subject: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Topic: Model<ITopic> = mongoose.models.Topic || mongoose.model<ITopic>("Topic", TopicSchema);
export default Topic;
