import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
    admission_no: string;
    roll_no: string;
    class: string;
    section: string;
    fname: string;
    lname: string;
    gender: string;
    dob: string;
    category: string;
    religion: string;
    caste: string;
    mobile: string;
    email: string;
    admission_date: string;
    blood_group: string;
    student_house: string;
    father_name: string;
    father_phone: string;
    father_email?: string;
    father_occupation?: string;
    mother_name?: string;
    mother_phone?: string;
    mother_email?: string;
    mother_occupation?: string;
    status: string; // "Active", "Disabled", etc.
    disable_reason?: string;
    height?: string;
    weight?: string;
    as_on_date?: string;
    medical_history?: string;
    photo?: string;
    sibling_admission_no?: string;
    created_at: Date;
}

const StudentSchema: Schema = new Schema({
    admission_no: { type: String, required: true, unique: true },
    roll_no: { type: String },
    class: { type: String, required: true },
    section: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    gender: { type: String },
    dob: { type: String },
    category: { type: String },
    religion: { type: String },
    caste: { type: String },
    mobile: { type: String },
    email: { type: String },
    admission_date: { type: String },
    blood_group: { type: String },
    student_house: { type: String },
    father_name: { type: String },
    father_phone: { type: String },
    father_email: { type: String },
    father_occupation: { type: String },
    mother_name: { type: String },
    mother_phone: { type: String },
    mother_email: { type: String },
    mother_occupation: { type: String },
    status: { type: String, default: "Active" },
    disable_reason: { type: String },
    height: { type: String },
    weight: { type: String },
    as_on_date: { type: String },
    medical_history: { type: String },
    photo: { type: String },
    sibling_admission_no: { type: String },
    created_at: { type: Date, default: Date.now },
});

const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
export default Student;
