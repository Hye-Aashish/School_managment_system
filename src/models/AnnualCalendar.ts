import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnnualCalendar extends Document {
    title: string;
    fromDate: string;
    toDate: string;
    type: "Holiday" | "Activity";
    description: string;
    createdBy: string;
    frontSite: string; // "Yes" or "No"
    created_at: Date;
}

const AnnualCalendarSchema: Schema = new Schema({
    title: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    type: { type: String, enum: ["Holiday", "Activity"], default: "Holiday" },
    description: { type: String },
    createdBy: { type: String },
    frontSite: { type: String, default: "Yes" },
    created_at: { type: Date, default: Date.now },
});

const AnnualCalendar: Model<IAnnualCalendar> = mongoose.models.AnnualCalendar || mongoose.model<IAnnualCalendar>("AnnualCalendar", AnnualCalendarSchema);
export default AnnualCalendar;
