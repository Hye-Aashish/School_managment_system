import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransportFeeMonth {
    month: string;
    dueDate: string;
    fineType: "None" | "Percentage" | "FixAmount";
    feeType: "Percentage" | "FixAmount";
    feeValue: string;
    fixAmount: string;
}

export interface ITransportFeeMaster extends Document {
    monthsData: ITransportFeeMonth[];
    created_at: Date;
    updated_at: Date;
}

const TransportFeeMonthSchema = new Schema<ITransportFeeMonth>({
    month: { type: String, required: true },
    dueDate: { type: String, default: "" },
    fineType: { type: String, enum: ["None", "Percentage", "FixAmount"], default: "None" },
    feeType: { type: String, enum: ["Percentage", "FixAmount"], default: "Percentage" },
    feeValue: { type: String, default: "" },
    fixAmount: { type: String, default: "" },
});

const TransportFeeMasterSchema: Schema = new Schema({
    monthsData: { type: [TransportFeeMonthSchema], default: [] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const TransportFeeMaster: Model<ITransportFeeMaster> = mongoose.models.TransportFeeMaster || mongoose.model<ITransportFeeMaster>("TransportFeeMaster", TransportFeeMasterSchema);
export default TransportFeeMaster;
