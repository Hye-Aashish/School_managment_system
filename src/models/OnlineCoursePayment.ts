import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineCoursePayment extends Document {
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    amount: number;
    payment_date: string;
    submit_date: Date;
    reference_no: string;
    slip_url?: string;
    status: "Pending" | "Approved" | "Rejected";
    status_date?: Date;
    note?: string;
}

const OnlineCoursePaymentSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: Schema.Types.ObjectId, ref: "OnlineCourse", required: true },
    amount: { type: Number, required: true },
    payment_date: { type: String, required: true },
    submit_date: { type: Date, default: Date.now },
    reference_no: { type: String, required: true },
    slip_url: { type: String },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    status_date: { type: Date },
    note: { type: String },
});

const OnlineCoursePayment: Model<IOnlineCoursePayment> = mongoose.models.OnlineCoursePayment || mongoose.model<IOnlineCoursePayment>("OnlineCoursePayment", OnlineCoursePaymentSchema);
export default OnlineCoursePayment;
