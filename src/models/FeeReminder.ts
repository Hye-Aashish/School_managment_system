import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeeReminder extends Document {
  action: boolean;
  reminderType: 'Before' | 'After';
  days: number;
}

const FeeReminderSchema: Schema = new Schema({
  action: { type: Boolean, default: false },
  reminderType: { type: String, enum: ['Before', 'After'], required: true },
  days: { type: Number, default: 0 },
});

const FeeReminder: Model<IFeeReminder> = mongoose.models.FeeReminder || mongoose.model<IFeeReminder>("FeeReminder", FeeReminderSchema);
export default FeeReminder;
