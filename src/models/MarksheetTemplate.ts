import mongoose from "mongoose";

const marksheetTemplateSchema = new mongoose.Schema(
     {
          templateName: { type: String, required: true },
          examName: { type: String },
          schoolName: { type: String },
          examCenter: { type: String },
          bodyText: { type: String },
          footerText: { type: String },
          printingDate: { type: String },
          headerImage: { type: String },
          leftLogo: { type: String },
          rightLogo: { type: String },
          leftSign: { type: String },
          middleSign: { type: String },
          rightSign: { type: String },
          backgroundImage: { type: String },
          toggles: {
               name: { type: Boolean, default: false },
               fatherName: { type: Boolean, default: false },
               motherName: { type: Boolean, default: false },
               examSession: { type: Boolean, default: false },
               admissionNo: { type: Boolean, default: false },
               division: { type: Boolean, default: false },
               rank: { type: Boolean, default: false },
               rollNumber: { type: Boolean, default: false },
               photo: { type: Boolean, default: false },
               class: { type: Boolean, default: false },
               section: { type: Boolean, default: false },
               dateOfBirth: { type: Boolean, default: false },
               remark: { type: Boolean, default: false },
          },
          isActive: { type: Boolean, default: false },
     },
     { timestamps: true }
);

const MarksheetTemplate = mongoose.models.MarksheetTemplate || mongoose.model("MarksheetTemplate", marksheetTemplateSchema);

export default MarksheetTemplate;
