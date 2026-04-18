import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInventoryStock extends Document {
    item: string;
    supplier: string;
    store: string;
    qty: number;
    purchaseDate: string;
    description: string;
    created_at: Date;
}

const InventoryStockSchema = new Schema({
    item: { type: String, required: true },
    supplier: { type: String },
    store: { type: String },
    qty: { type: Number, required: true },
    purchaseDate: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now }
});

export const InventoryStock = mongoose.models.InventoryStock || mongoose.model<IInventoryStock>("InventoryStock", InventoryStockSchema);

export interface IInventoryIssue extends Document {
    item: string;
    issueTo: string;
    issueBy: string;
    qty: number;
    issueDate: string;
    returnDate: string;
    status: "Issued" | "Returned";
    created_at: Date;
}

const InventoryIssueSchema = new Schema({
    item: { type: String, required: true },
    issueTo: { type: String, required: true },
    issueBy: { type: String },
    qty: { type: Number, required: true },
    issueDate: { type: String, required: true },
    returnDate: { type: String },
    status: { type: String, enum: ["Issued", "Returned"], default: "Issued" },
    created_at: { type: Date, default: Date.now }
});

export const InventoryIssue = mongoose.models.InventoryIssue || mongoose.model<IInventoryIssue>("InventoryIssue", InventoryIssueSchema);
