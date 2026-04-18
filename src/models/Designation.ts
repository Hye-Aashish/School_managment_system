import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDesignation extends Document {
    name: string;
}

const DesignationSchema: Schema = new Schema({
    name: { type: String, required: true },
});

const Designation: Model<IDesignation> = mongoose.models.Designation || mongoose.model<IDesignation>("Designation", DesignationSchema);
export default Designation;
