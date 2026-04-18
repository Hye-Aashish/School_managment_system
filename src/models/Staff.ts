import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStaff extends Document {
    staffId: string;
    staff_id?: string;
    role: string;
    designation: string;
    department: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    email: string;
    gender: string;
    dob: string;
    dateOfJoining: string;
    phone: string;
    emergencyContact: string;
    maritalStatus: string;
    currentAddress: string;
    permanentAddress: string;
    qualification: string;
    workExperience: string;
    note: string;
    status: "Active" | "Disabled";
    created_at: Date;
}

const StaffSchema: Schema = new Schema({
    staffId: { type: String, required: true, unique: true },
    staff_id: { type: String }, // For legacy index compatibility
    role: { type: String, required: true },
    designation: { type: String },
    department: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    email: { type: String },
    gender: { type: String },
    dob: { type: String },
    dateOfJoining: { type: String },
    phone: { type: String },
    emergencyContact: { type: String },
    maritalStatus: { type: String },
    currentAddress: { type: String },
    permanentAddress: { type: String },
    qualification: { type: String },
    workExperience: { type: String },
    note: { type: String },
    status: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    created_at: { type: Date, default: Date.now }
});

const Staff: Model<IStaff> = mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
export default Staff;
