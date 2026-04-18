import mongoose, { Schema, Document } from "mongoose";

export interface ISubjectGroup extends Document {
  name: string;
  class: mongoose.Types.ObjectId;
  sections: mongoose.Types.ObjectId[];
  subjects: mongoose.Types.ObjectId[];
  description: string;
}

const SubjectGroupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.SubjectGroup || mongoose.model<ISubjectGroup>("SubjectGroup", SubjectGroupSchema);
