import mongoose, { Document, Schema } from "mongoose";

export interface IZoomSetting extends Document {
  apiKey: string;
  apiSecret: string;
  useGoogleCalendar: boolean; // Keeping field names consistent with Gmeet for template compatibility
  parentLiveClass: boolean;
}

const ZoomSettingSchema: Schema = new Schema(
  {
    apiKey: { type: String, default: "" },
    apiSecret: { type: String, default: "" },
    useGoogleCalendar: { type: Boolean, default: false },
    parentLiveClass: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.ZoomSetting ||
  mongoose.model<IZoomSetting>("ZoomSetting", ZoomSettingSchema);
