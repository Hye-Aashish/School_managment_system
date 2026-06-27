import mongoose from "mongoose";

const StaffLeaveSchema = new mongoose.Schema({
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    leaveType: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    days: { type: Number, required: true },
    applyDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Pending", "Approved", "Disapproved"], default: "Pending" },
    reason: { type: String }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.StaffLeave || mongoose.model("StaffLeave", StaffLeaveSchema);
