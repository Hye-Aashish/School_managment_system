import mongoose, { Document, Schema } from "mongoose";

export interface IJoinEntry {
  admissionNo: string;
  studentName: string;
  fatherName: string;
  lastJoin: Date;
}

export interface IGmeetLiveMeeting extends Document {
  meetingTitle: string;
  description: string;
  dateTime: Date;
  duration: number; // in minutes
  createdBy: string;
  classes: string[];
  meetUrl: string;
  joinList: IJoinEntry[];
  status: string;
}

const JoinEntrySchema = new Schema({
  admissionNo: { type: String, default: "" },
  studentName: { type: String, default: "" },
  fatherName: { type: String, default: "" },
  lastJoin: { type: Date, default: Date.now },
}, { _id: false });

const GmeetLiveMeetingSchema: Schema = new Schema(
  {
    meetingTitle: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    dateTime: { type: Date, required: true },
    duration: { type: Number, default: 0 },
    createdBy: { type: String, trim: true },
    classes: { type: [String], default: [] },
    meetUrl: { type: String, trim: true, default: "" },
    joinList: { type: [JoinEntrySchema], default: [] },
    status: {
      type: String,
      enum: ["Awaited", "Started", "Completed", "Cancelled"],
      default: "Awaited",
    },
  },
  { timestamps: true }
);

export default mongoose.models.GmeetLiveMeeting ||
  mongoose.model<IGmeetLiveMeeting>("GmeetLiveMeeting", GmeetLiveMeetingSchema);
