import mongoose from "mongoose";

const examMarkSchema = new mongoose.Schema(
     {
          exam: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Exam",
               required: true,
          },
          student: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Student",
               required: true,
          },
          subject: {
               type: String,
               required: true,
          },
          marks: {
               type: Number,
               required: true,
          },
          absent: {
               type: Boolean,
               default: false,
          },
          note: {
               type: String,
          }
     },
     { timestamps: true }
);

const ExamMark = mongoose.models.ExamMark || mongoose.model("ExamMark", examMarkSchema);

export default ExamMark;
