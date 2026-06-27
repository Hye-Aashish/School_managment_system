import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItemSupplier extends Document {
    supplier: string;
    phone: string;
    email: string;
    address: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
    description: string;
    status: "Active" | "Disabled";
    created_at: Date;
}

const ItemSupplierSchema: Schema = new Schema({
    supplier: { type: String, required: true },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    contactPerson: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    created_at: { type: Date, default: Date.now }
});

const ItemSupplier: Model<IItemSupplier> = mongoose.models.ItemSupplier || mongoose.model<IItemSupplier>("ItemSupplier", ItemSupplierSchema);
export default ItemSupplier;
