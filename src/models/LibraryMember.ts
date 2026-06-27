import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILibraryMember extends Document {
    memberId: string;
    memberType: "Student" | "Staff";
    libraryCardNo: string;
    status: "Active" | "Returned";
    created_at: Date;
}

const LibraryMemberSchema: Schema = new Schema({
    memberId: { type: String, required: true },
    memberType: { type: String, enum: ["Student", "Staff"], required: true },
    libraryCardNo: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Returned"], default: "Active" },
    created_at: { type: Date, default: Date.now }
});

const LibraryMember: Model<ILibraryMember> = mongoose.models.LibraryMember || mongoose.model<ILibraryMember>("LibraryMember", LibraryMemberSchema);
export default LibraryMember;
