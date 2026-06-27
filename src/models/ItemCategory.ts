import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItemCategory extends Document {
    name: string;
    description: string;
    status: "Active" | "Disabled";
    created_at: Date;
}

const ItemCategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    created_at: { type: Date, default: Date.now }
});

const ItemCategory: Model<IItemCategory> = mongoose.models.ItemCategory || mongoose.model<IItemCategory>("ItemCategory", ItemCategorySchema);
export default ItemCategory;
