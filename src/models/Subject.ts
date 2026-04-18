import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
  name: string;
  type: "Theory" | "Practical";
  code: string;
}

const SubjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["Theory", "Practical"], default: "Theory" },
    code: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Subject || mongoose.model<ISubject>("Subject", SubjectSchema);
