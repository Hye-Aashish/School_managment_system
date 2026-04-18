import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInventoryItem extends Document {
    name: string;
    category: string;
    unit: string;
    description: string;
    totalQty: number;
    availableQty: number;
    created_at: Date;
}

const InventoryItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String },
    description: { type: String },
    totalQty: { type: Number, default: 0 },
    availableQty: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

const InventoryItem: Model<IInventoryItem> = mongoose.models.InventoryItem || mongoose.model<IInventoryItem>("InventoryItem", InventoryItemSchema);
export default InventoryItem;
