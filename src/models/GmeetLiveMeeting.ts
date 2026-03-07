import mongoose, { Document, Schema } from "mongoose";

export interface IGmeetLiveMeeting extends Document {
  meetingTitle: string;
  description: string;
  dateTime: Date;
  duration: number; // in minutes
  createdBy: string;
  status: string;
}

const GmeetLiveMeetingSchema: Schema = new Schema(
  {
    meetingTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    dateTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      trim: true,
    },
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
