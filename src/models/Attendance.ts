import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttendance extends Document {
    student: mongoose.Types.ObjectId;
    date: string; // Format: YYYY-MM-DD
    status: string; // Present, Absent, Late, Holiday, Half Day
    entryTime?: string;
    exitTime?: string;
    note?: string;
    class: string;
    section: string;
    created_at: Date;
}

const AttendanceSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
    entryTime: { type: String },
    exitTime: { type: String },
    note: { type: String },
    class: { type: String, required: true },
    section: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Compound unique index to prevent duplicate attendance for a student on the same day
AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ date: 1, class: 1, section: 1 });

const Attendance: Model<IAttendance> = mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema);
export default Attendance;
