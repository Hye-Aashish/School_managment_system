import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  sections: mongoose.Types.ObjectId[];
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
  },
  { timestamps: true }
);

export default mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);
