import mongoose from "mongoose";

const marksDivisionSchema = new mongoose.Schema(
     {
          divisionName: {
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
          }
     },
     { timestamps: true }
);

const MarksDivision = mongoose.models.MarksDivision || mongoose.model("MarksDivision", marksDivisionSchema);

export default MarksDivision;
