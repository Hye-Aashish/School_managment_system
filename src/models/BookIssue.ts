import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookIssue extends Document {
    bookId: string;
    memberId: string;
    memberType: "Student" | "Staff";
    issueDate: string;
    returnDate: string;
    actualReturnDate: string;
    status: "Issued" | "Returned";
    created_at: Date;
}

const BookIssueSchema: Schema = new Schema({
    bookId: { type: String, required: true },
    memberId: { type: String, required: true },
    memberType: { type: String, enum: ["Student", "Staff"], required: true },
    issueDate: { type: String, required: true },
    returnDate: { type: String, required: true },
    actualReturnDate: { type: String },
    status: { type: String, enum: ["Issued", "Returned"], default: "Issued" },
    created_at: { type: Date, default: Date.now }
});

const BookIssue: Model<IBookIssue> = mongoose.models.BookIssue || mongoose.model<IBookIssue>("BookIssue", BookIssueSchema);
export default BookIssue;
