import mongoose, { Schema, Document } from "mongoose";

export interface IIncident extends Document {
  title: string;
  point: number;
  isNegative: boolean;
  description: string;
}

const IncidentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    point: { type: Number, required: true },
    isNegative: { type: Boolean, default: false },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Incident || mongoose.model<IIncident>("Incident", IncidentSchema);
