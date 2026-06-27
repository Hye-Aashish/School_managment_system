import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPaymentConfig extends Document {
    provider: "razorpay" | "cashfree";
    enabled: boolean;
    keyId: string;       // Razorpay Key ID or Cashfree App ID
    keySecret: string;   // Razorpay Key Secret or Cashfree Secret Key
    sandbox: boolean;    // Environment: true for sandbox, false for production
    created_at: Date;
    updated_at: Date;
}

const PaymentConfigSchema: Schema = new Schema({
    provider: { type: String, enum: ["razorpay", "cashfree"], required: true, unique: true },
    enabled: { type: Boolean, default: false },
    keyId: { type: String, default: "" },
    keySecret: { type: String, default: "" },
    sandbox: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const PaymentConfig: Model<IPaymentConfig> = mongoose.models.PaymentConfig || mongoose.model<IPaymentConfig>("PaymentConfig", PaymentConfigSchema);
export default PaymentConfig;
