import mongoose from "mongoose";

const IncomeHeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.IncomeHead || mongoose.model("IncomeHead", IncomeHeadSchema);
