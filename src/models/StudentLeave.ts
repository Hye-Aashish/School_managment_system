import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentLeave extends Document {
    student: mongoose.Types.ObjectId;
    class: string;
    section: string;
    applyDate: Date;
    fromDate: Date;
    toDate: Date;
    reason: string;
    status: "Pending" | "Approved" | "Disapproved";
    approvedBy?: string;
    docs?: string;
    created_at: Date;
}

const StudentLeaveSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    applyDate: { type: Date, default: Date.now },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    reason: { type: String },
    status: { type: String, enum: ["Pending", "Approved", "Disapproved"], default: "Pending" },
    approvedBy: { type: String },
    docs: { type: String },
    created_at: { type: Date, default: Date.now }
});

const StudentLeave: Model<IStudentLeave> = mongoose.models.StudentLeave || mongoose.model<IStudentLeave>("StudentLeave", StudentLeaveSchema);
export default StudentLeave;
