import mongoose, { Schema, Document } from "mongoose";

export interface ISection extends Document {
  name: string;
}

const SectionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema);
