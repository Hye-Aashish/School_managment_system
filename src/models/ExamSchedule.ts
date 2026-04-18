import mongoose from "mongoose";

const examScheduleSchema = new mongoose.Schema(
     {
          exam: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Exam",
               required: true,
          },
          subject: {
               type: String,
               required: true,
          },
          dateFrom: {
               type: String,
               required: true,
          },
          startTime: {
               type: String,
               required: true,
          },
          duration: {
               type: String,
               required: true,
          },
          roomNo: {
               type: String,
               required: true,
          },
          maxMarks: {
               type: Number,
               required: true,
          },
          minMarks: {
               type: Number,
               required: true,
          }
     },
     { timestamps: true }
);

const ExamSchedule = mongoose.models.ExamSchedule || mongoose.model("ExamSchedule", examScheduleSchema);

export default ExamSchedule;
