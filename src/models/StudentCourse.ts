import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentCourse extends Document {
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    status: "Active" | "Expired" | "Cancelled";
    purchase_date: Date;
    expiry_date?: Date;
}

const StudentCourseSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: Schema.Types.ObjectId, ref: "OnlineCourse", required: true },
    status: { type: String, enum: ["Active", "Expired", "Cancelled"], default: "Active" },
    purchase_date: { type: Date, default: Date.now },
    expiry_date: { type: Date },
});

const StudentCourse: Model<IStudentCourse> = mongoose.models.StudentCourse || mongoose.model<IStudentCourse>("StudentCourse", StudentCourseSchema);
export default StudentCourse;
