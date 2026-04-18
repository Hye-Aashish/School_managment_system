import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBook extends Document {
    title: string;
    bookNo: string;
    isbn: string;
    publisher: string;
    author: string;
    subject: string;
    rackNo: string;
    qty: number;
    availableQty: number;
    price: number;
    postDate: string;
    description: string;
    created_at: Date;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    bookNo: { type: String, required: true, unique: true },
    isbn: { type: String },
    publisher: { type: String },
    author: { type: String },
    subject: { type: String },
    rackNo: { type: String },
    qty: { type: Number, default: 0 },
    availableQty: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    postDate: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
export default Book;
