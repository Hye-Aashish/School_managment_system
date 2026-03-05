import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentCategory extends Document {
    category: string;
}

const StudentCategorySchema: Schema = new Schema({
    category: { type: String, required: true, unique: true },
});

const StudentCategory: Model<IStudentCategory> = mongoose.models.StudentCategory || mongoose.model<IStudentCategory>("StudentCategory", StudentCategorySchema);
export default StudentCategory;
