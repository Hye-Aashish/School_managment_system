import mongoose, { Document, Schema } from "mongoose";

export interface IGmeetSetting extends Document {
  apiKey: string;
  apiSecret: string;
  useGoogleCalendar: boolean;
  parentLiveClass: boolean;
}

const GmeetSettingSchema: Schema = new Schema(
  {
    apiKey: {
      type: String,
      default: "",
    },
    apiSecret: {
      type: String,
      default: "",
    },
    useGoogleCalendar: {
      type: Boolean,
      default: false,
    },
    parentLiveClass: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.GmeetSetting ||
  mongoose.model<IGmeetSetting>("GmeetSetting", GmeetSettingSchema);
