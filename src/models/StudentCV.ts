import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentCV extends Document {
    studentId: string;
    bio: string;
    skills: string[];
    achievements: string[];
    experience: { title: string; company: string; duration: string; description: string }[];
    education: { degree: string; school: string; year: string; result: string }[];
    projects: { name: string; link: string; description: string }[];
    created_at: Date;
    updated_at: Date;
}

const StudentCVSchema: Schema = new Schema({
    studentId: { type: String, required: true, unique: true },
    bio: { type: String },
    skills: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    experience: [{
        title: { type: String },
        company: { type: String },
        duration: { type: String },
        description: { type: String }
    }],
    education: [{
        degree: { type: String },
        school: { type: String },
        year: { type: String },
        result: { type: String }
    }],
    projects: [{
        name: { type: String },
        link: { type: String },
        description: { type: String }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const StudentCV: Model<IStudentCV> = mongoose.models.StudentCV || mongoose.model<IStudentCV>("StudentCV", StudentCVSchema);
export default StudentCV;
