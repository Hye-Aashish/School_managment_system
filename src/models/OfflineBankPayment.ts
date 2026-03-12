import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOfflineBankPayment extends Document {
    student: mongoose.Types.ObjectId;
    fee_master: mongoose.Types.ObjectId;
    amount: number;
    payment_date: string;
    submit_date: Date;
    reference_no: string;
    slip_url?: string;
    status: "Pending" | "Approved" | "Rejected";
    status_date?: Date;
    payment_id?: string; // Generated after approval
    note?: string;
}

const OfflineBankPaymentSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    fee_master: { type: Schema.Types.ObjectId, ref: "FeeMaster", required: true },
    amount: { type: Number, required: true },
    payment_date: { type: String, required: true },
    submit_date: { type: Date, default: Date.now },
    reference_no: { type: String, required: true },
    slip_url: { type: String },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    status_date: { type: Date },
    payment_id: { type: String },
    note: { type: String },
});

const OfflineBankPayment: Model<IOfflineBankPayment> = mongoose.models.OfflineBankPayment || mongoose.model<IOfflineBankPayment>("OfflineBankPayment", OfflineBankPaymentSchema);
export default OfflineBankPayment;
