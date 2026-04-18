import mongoose from "mongoose";

const examGroupSchema = new mongoose.Schema(
     {
          name: {
               type: String,
               required: true,
          },
          examType: {
               type: String,
               required: true,
          },
          description: {
               type: String,
          },
          noOfExams: {
               type: Number,
               default: 0,
          }
     },
     { timestamps: true }
);

const ExamGroup = mongoose.models.ExamGroup || mongoose.model("ExamGroup", examGroupSchema);

export default ExamGroup;
