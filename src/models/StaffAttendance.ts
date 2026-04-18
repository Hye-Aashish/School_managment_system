import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStaffAttendance extends Document {
    staffId: string;
    date: string;
    status: "Present" | "Absent" | "Late" | "Half Day" | "Holiday";
    note: string;
    created_at: Date;
}

const StaffAttendanceSchema: Schema = new Schema({
    staffId: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["Present", "Absent", "Late", "Half Day", "Holiday"], required: true },
    note: { type: String },
    created_at: { type: Date, default: Date.now }
});

// Ensure one entry per staff member per day
StaffAttendanceSchema.index({ staffId: 1, date: 1 }, { unique: true });

const StaffAttendance: Model<IStaffAttendance> = mongoose.models.StaffAttendance || mongoose.model<IStaffAttendance>("StaffAttendance", StaffAttendanceSchema);
export default StaffAttendance;
