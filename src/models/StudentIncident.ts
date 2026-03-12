import mongoose, { Schema, Document } from "mongoose";

export interface IStudentIncident extends Document {
  student: mongoose.Types.ObjectId;
  incident: mongoose.Types.ObjectId;
  date: Date;
  assignedBy: string;
  session: string;
  description?: string;
}

const StudentIncidentSchema: Schema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    incident: { type: Schema.Types.ObjectId, ref: "Incident", required: true },
    date: { type: Date, default: Date.now },
    assignedBy: { type: String, required: true },
    session: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.StudentIncident || mongoose.model<IStudentIncident>("StudentIncident", StudentIncidentSchema);
