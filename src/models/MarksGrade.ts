import mongoose from "mongoose";

const marksGradeSchema = new mongoose.Schema(
     {
          examType: {
               type: String,
               required: true,
          },
          gradeName: {
               type: String,
               required: true,
          },
          percentFrom: {
               type: Number,
               required: true,
          },
          percentUpto: {
               type: Number,
               required: true,
          },
          gradePoint: {
               type: Number,
               required: true,
          },
          description: {
               type: String,
          },
     },
     { timestamps: true }
);

const MarksGrade = mongoose.models.MarksGrade || mongoose.model("MarksGrade", marksGradeSchema);

export default MarksGrade;
