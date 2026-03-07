import mongoose, { Document, Schema } from "mongoose";

export interface IGmeetLiveClass extends Document {
  classTitle: string;
  description: string;
  dateTime: Date;
  duration: number; // in minutes
  createdBy: string;
  createdFor: string;
  classes: string[];
  status: string;
}

const GmeetLiveClassSchema: Schema = new Schema(
  {
    classTitle: {
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
    createdFor: {
      type: String,
      trim: true,
    },
    classes: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Awaited", "Started", "Completed", "Cancelled"],
      default: "Awaited",
    },
  },
  { timestamps: true }
);

export default mongoose.models.GmeetLiveClass ||
  mongoose.model<IGmeetLiveClass>("GmeetLiveClass", GmeetLiveClassSchema);
