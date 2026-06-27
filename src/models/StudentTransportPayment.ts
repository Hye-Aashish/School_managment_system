import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentTransportPayment extends Document {
    studentId: string;
    studentName: string;
    admissionNo: string;
    month: string;
    amountPaid: number;
    paymentDate: Date;
    paymentMode: "Cash" | "Card" | "Online" | "Cheque";
    note?: string;
    created_at: Date;
}

const StudentTransportPaymentSchema: Schema = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: { type: String, required: true },
    admissionNo: { type: String, required: true },
    month: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMode: { type: String, enum: ["Cash", "Card", "Online", "Cheque"], default: "Cash" },
    note: { type: String, default: "" },
    created_at: { type: Date, default: Date.now }
});

const StudentTransportPayment: Model<IStudentTransportPayment> = mongoose.models.StudentTransportPayment || mongoose.model<IStudentTransportPayment>("StudentTransportPayment", StudentTransportPaymentSchema);
export default StudentTransportPayment;
