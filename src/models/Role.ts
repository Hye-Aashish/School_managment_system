import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRole extends Document {
    name: string;
    permissions: string[];
    created_at: Date;
}

const RoleSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now }
});

const Role: Model<IRole> = mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
export default Role;
