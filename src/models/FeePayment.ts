import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeePayment extends Document {
    student: mongoose.Types.ObjectId;
    fee_master: mongoose.Types.ObjectId;
    amount_paid: number;
    payment_mode: string; // Cash, Cheque, Online, Bank Transfer
    date: string;
    reference_no?: string;
    note?: string;
    discount_amount: number;
    fine_amount: number;
    discount?: mongoose.Types.ObjectId;
    status: string; // Success, Refunded
    created_at: Date;
}

const FeePaymentSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    fee_master: { type: Schema.Types.ObjectId, ref: "FeeMaster", required: true },
    amount_paid: { type: Number, required: true },
    payment_mode: { type: String, required: true },
    date: { type: String, required: true },
    reference_no: { type: String },
    note: { type: String },
    discount_amount: { type: Number, default: 0 },
    fine_amount: { type: Number, default: 0 },
    discount: { type: Schema.Types.ObjectId, ref: "FeeDiscount" },
    status: { type: String, default: "Success" },
    created_at: { type: Date, default: Date.now },
});

const FeePayment: Model<IFeePayment> = mongoose.models.FeePayment || mongoose.model<IFeePayment>("FeePayment", FeePaymentSchema);
export default FeePayment;
