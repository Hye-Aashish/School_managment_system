import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourseCategory extends Document {
    name: string;
    created_at: Date;
}

const CourseCategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
});

const CourseCategory: Model<ICourseCategory> = mongoose.models.CourseCategory || mongoose.model<ICourseCategory>("CourseCategory", CourseCategorySchema);
export default CourseCategory;
