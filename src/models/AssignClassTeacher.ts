import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAssignClassTeacher extends Document {
    class: string;
    section: string;
    teachers: mongoose.Types.ObjectId[];
}

const AssignClassTeacherSchema: Schema = new Schema({
    class: { type: String, required: true },
    section: { type: String, required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
}, { timestamps: true });

// Ensure unique combination of class and section
AssignClassTeacherSchema.index({ class: 1, section: 1 }, { unique: true });

const AssignClassTeacher: Model<IAssignClassTeacher> = mongoose.models.AssignClassTeacher || mongoose.model<IAssignClassTeacher>("AssignClassTeacher", AssignClassTeacherSchema);
export default AssignClassTeacher;
