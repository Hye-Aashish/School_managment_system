import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDepartment extends Document {
    name: string;
}

const DepartmentSchema: Schema = new Schema({
    name: { type: String, required: true },
});

const Department: Model<IDepartment> = mongoose.models.Department || mongoose.model<IDepartment>("Department", DepartmentSchema);
export default Department;
