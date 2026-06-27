import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItem extends Document {
    name: string;
    category: string;
    unit: string;
    description: string;
    totalQty: number;
    availableQty: number;
    created_at: Date;
}

const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, default: "" },
    description: { type: String, default: "" },
    totalQty: { type: Number, default: 0 },
    availableQty: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
export default Item;
