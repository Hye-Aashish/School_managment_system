import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    expenseHead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseHead",
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

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
