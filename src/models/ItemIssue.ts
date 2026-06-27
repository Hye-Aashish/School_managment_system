import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItemIssue extends Document {
    item: string;
    issueTo: string;
    issueBy: string;
    issueDate: Date;
    returnDate: Date | null;
    note: string;
    qty: number;
    status: "Issued" | "Returned";
    created_at: Date;
}

const ItemIssueSchema: Schema = new Schema({
    item: { type: String, required: true },
    issueTo: { type: String, required: true },
    issueBy: { type: String, default: "" },
    issueDate: { type: Date, default: Date.now },
    returnDate: { type: Date, default: null },
    note: { type: String, default: "" },
    qty: { type: Number, required: true },
    status: { type: String, enum: ["Issued", "Returned"], default: "Issued" },
    created_at: { type: Date, default: Date.now }
});

const ItemIssue: Model<IItemIssue> = mongoose.models.ItemIssue || mongoose.model<IItemIssue>("ItemIssue", ItemIssueSchema);
export default ItemIssue;
