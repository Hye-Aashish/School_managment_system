import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayroll extends Document {
    staff: mongoose.Types.ObjectId;
    month: string;
    year: string;
    basicSalary: number;
    allowance: number;
    deductions: number;
    netSalary: number;
    paymentMode: string;
    note?: string;
    status: "Generated" | "Paid";
    createdAt: Date;
}

const PayrollSchema: Schema = new Schema({
    staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    allowance: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    note: { type: String },
    status: { type: String, enum: ["Generated", "Paid"], default: "Generated" },
    createdAt: { type: Date, default: Date.now }
});

// Ensure a staff can only have one payslip per month/year
PayrollSchema.index({ staff: 1, month: 1, year: 1 }, { unique: true });

const Payroll: Model<IPayroll> = mongoose.models.Payroll || mongoose.model<IPayroll>("Payroll", PayrollSchema);
export default Payroll;
