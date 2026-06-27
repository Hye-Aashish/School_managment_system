import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOnlineCourseQuestion {
    question: string;
    options: string[];
    answer: string;
}

export interface IOnlineCourseCurriculumItem {
    _id?: any;
    title: string;
    type: "video" | "quiz" | "exam" | "assignment" | "content";
    duration?: string;
    videoUrl?: string;
    videoProvider?: string;
    questions?: IOnlineCourseQuestion[];
    assignmentDesc?: string;
    assignmentUrl?: string;
    contentBody?: string;
    contentUrl?: string;
}

export interface IOnlineCourseSection {
    _id?: any;
    title: string;
    items: IOnlineCourseCurriculumItem[];
}

export interface IOnlineCourse extends Document {
    title: string;
    category: mongoose.Types.ObjectId;
    courseProvider: string;
    courseDescription?: string;
    price: number;
    currentPrice: number;
    thumbnailUrl?: string;
    outcomes?: string[];
    class?: mongoose.Types.ObjectId;
    sections?: mongoose.Types.ObjectId[];
    assignTeacher?: mongoose.Types.ObjectId;
    coursePreviewProvider?: string;
    coursePreviewUrl?: string;
    discount?: number;
    freeCourse?: boolean;
    frontSiteVisibility?: string;
    certificate?: string;
    curriculum?: IOnlineCourseSection[];
    created_at: Date;
    updated_at: Date;
}

const OnlineCourseQuestionSchema = new Schema({
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String }
});

const OnlineCourseCurriculumItemSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "quiz", "exam", "assignment", "content"], required: true },
    duration: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    videoProvider: { type: String, default: "Youtube" },
    questions: [OnlineCourseQuestionSchema],
    assignmentDesc: { type: String, default: "" },
    assignmentUrl: { type: String, default: "" },
    contentBody: { type: String, default: "" },
    contentUrl: { type: String, default: "" }
});

const OnlineCourseSectionSchema = new Schema({
    title: { type: String, required: true },
    items: [OnlineCourseCurriculumItemSchema]
});

const OnlineCourseSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "CourseCategory", required: true },
    courseProvider: { type: String, required: true },
    courseDescription: { type: String },
    price: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    thumbnailUrl: { type: String },
    outcomes: [{ type: String }],
    class: { type: Schema.Types.ObjectId, ref: "Class" },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    assignTeacher: { type: Schema.Types.ObjectId, ref: "Staff" },
    coursePreviewProvider: { type: String, default: "Youtube" },
    coursePreviewUrl: { type: String },
    discount: { type: Number, default: 0 },
    freeCourse: { type: Boolean, default: false },
    frontSiteVisibility: { type: String, default: "Yes" },
    certificate: { type: String, default: "" },
    curriculum: [OnlineCourseSectionSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const OnlineCourse: Model<IOnlineCourse> = mongoose.models.OnlineCourse || mongoose.model<IOnlineCourse>("OnlineCourse", OnlineCourseSchema);
export default OnlineCourse;
