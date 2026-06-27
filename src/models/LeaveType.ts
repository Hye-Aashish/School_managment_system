import mongoose from "mongoose";

const LeaveTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.LeaveType || mongoose.model("LeaveType", LeaveTypeSchema);
