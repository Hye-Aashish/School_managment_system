import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITimetableEntry {
    subject: string;
    time: string;
    teacher: string;
    room: string;
}

export interface ITimetable extends Document {
    className: string;
    section: string;
    monday: ITimetableEntry[];
    tuesday: ITimetableEntry[];
    wednesday: ITimetableEntry[];
    thursday: ITimetableEntry[];
    friday: ITimetableEntry[];
    saturday: ITimetableEntry[];
    sunday: ITimetableEntry[];
    created_at: Date;
}

const TimetableEntrySchema = new Schema({
    subject: { type: String, required: true },
    time: { type: String, required: true },
    teacher: { type: String, required: true },
    room: { type: String, default: "" }
});

const TimetableSchema = new Schema({
    className: { type: String, required: true },
    section: { type: String, required: true },
    monday: { type: [TimetableEntrySchema], default: [] },
    tuesday: { type: [TimetableEntrySchema], default: [] },
    wednesday: { type: [TimetableEntrySchema], default: [] },
    thursday: { type: [TimetableEntrySchema], default: [] },
    friday: { type: [TimetableEntrySchema], default: [] },
    saturday: { type: [TimetableEntrySchema], default: [] },
    sunday: { type: [TimetableEntrySchema], default: [] },
    created_at: { type: Date, default: Date.now }
});

// Unique combination of className and section
TimetableSchema.index({ className: 1, section: 1 }, { unique: true });

const Timetable: Model<ITimetable> = mongoose.models.Timetable || mongoose.model<ITimetable>("Timetable", TimetableSchema);
export default Timetable;
