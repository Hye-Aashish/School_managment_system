import mongoose, { Schema, Document } from "mongoose";

export interface IBehaviourSetting extends Document {
  isModuleEnabled: boolean;
  parentVisible: boolean;
  studentVisible: boolean;
}

const BehaviourSettingSchema: Schema = new Schema(
  {
    isModuleEnabled: { type: Boolean, default: true },
    parentVisible: { type: Boolean, default: false },
    studentVisible: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.BehaviourSetting || mongoose.model<IBehaviourSetting>("BehaviourSetting", BehaviourSettingSchema);
