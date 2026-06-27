import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItemStock extends Document {
    item: string;
    supplier: string;
    store: string;
    qty: number;
    purchaseDate: Date;
    document: string;
    description: string;
    created_at: Date;
}

const ItemStockSchema: Schema = new Schema({
    item: { type: String, required: true },
    supplier: { type: String, default: "" },
    store: { type: String, default: "" },
    qty: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
    document: { type: String, default: "" },
    description: { type: String, default: "" },
    created_at: { type: Date, default: Date.now }
});

const ItemStock: Model<IItemStock> = mongoose.models.ItemStock || mongoose.model<IItemStock>("ItemStock", ItemStockSchema);
export default ItemStock;
