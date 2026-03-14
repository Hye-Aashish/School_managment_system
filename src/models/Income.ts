import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    incomeHead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IncomeHead",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    document: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Income || mongoose.model("Income", IncomeSchema);
