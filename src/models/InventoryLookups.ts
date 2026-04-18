import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInventoryCategory extends Document { name: string; }
const InventoryCategorySchema = new Schema({ name: { type: String, required: true } });
export const InventoryCategory = mongoose.models.InventoryCategory || mongoose.model<IInventoryCategory>("InventoryCategory", InventoryCategorySchema);

export interface IInventoryStore extends Document { name: string; code: string; }
const InventoryStoreSchema = new Schema({ name: { type: String, required: true }, code: { type: String } });
export const InventoryStore = mongoose.models.InventoryStore || mongoose.model<IInventoryStore>("InventoryStore", InventoryStoreSchema);

export interface IInventorySupplier extends Document { name: string; phone: string; email: string; }
const InventorySupplierSchema = new Schema({ name: { type: String, required: true }, phone: { type: String }, email: { type: String } });
export const InventorySupplier = mongoose.models.InventorySupplier || mongoose.model<IInventorySupplier>("InventorySupplier", InventorySupplierSchema);
