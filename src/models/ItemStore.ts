import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItemStore extends Document {
    storeName: string;
    storeCode: string;
    description: string;
    status: "Active" | "Disabled";
    created_at: Date;
}

const ItemStoreSchema: Schema = new Schema({
    storeName: { type: String, required: true, unique: true },
    storeCode: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    created_at: { type: Date, default: Date.now }
});

const ItemStore: Model<IItemStore> = mongoose.models.ItemStore || mongoose.model<IItemStore>("ItemStore", ItemStoreSchema);
export default ItemStore;
