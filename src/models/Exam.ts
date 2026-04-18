import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
     {
          examGroup: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "ExamGroup",
               required: true,
          },
          name: {
               type: String,
               required: true,
          },
          session: {
               type: String,
          },
          publish: {
               type: Boolean,
               default: false,
          },
          publishResult: {
               type: Boolean,
               default: false,
          },
          description: {
               type: String,
          }
     },
     { timestamps: true }
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default Exam;
