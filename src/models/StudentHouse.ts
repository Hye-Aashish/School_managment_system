import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentHouse extends Document {
    house_name: string;
    description: string;
}

const StudentHouseSchema: Schema = new Schema({
    house_name: { type: String, required: true, unique: true },
    description: { type: String },
});

const StudentHouse: Model<IStudentHouse> = mongoose.models.StudentHouse || mongoose.model<IStudentHouse>("StudentHouse", StudentHouseSchema);
export default StudentHouse;
