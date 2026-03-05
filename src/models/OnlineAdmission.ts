import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineAdmission extends Document {
    reference_no: string;
    first_name: string;
    last_name: string;
    class: string;
    section: string;
    father_name: string;
    dob: string;
    gender: string;
    category: string;
    mobile_no: string;
    status: string;
    payment_status: string;
    admission_date: string;
    created_at: Date;
}

const OnlineAdmissionSchema: Schema = new Schema({
    reference_no: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    father_name: { type: String },
    dob: { type: String },
    gender: { type: String },
    category: { type: String },
    mobile_no: { type: String },
    status: { type: String, default: "Submitted" },
    payment_status: { type: String, default: "Paid" },
    admission_date: { type: String },
    created_at: { type: Date, default: Date.now },
});

const OnlineAdmission: Model<IOnlineAdmission> = mongoose.models.OnlineAdmission || mongoose.model<IOnlineAdmission>("OnlineAdmission", OnlineAdmissionSchema);
export default OnlineAdmission;
