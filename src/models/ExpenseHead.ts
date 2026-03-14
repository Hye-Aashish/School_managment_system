import mongoose from "mongoose";

const ExpenseHeadSchema = new mongoose.Schema(
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

export default mongoose.models.ExpenseHead || mongoose.model("ExpenseHead", ExpenseHeadSchema);
