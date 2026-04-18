import mongoose from "mongoose";

const admitCardTemplateSchema = new mongoose.Schema(
     {
          templateName: { type: String, required: true },
          heading: { type: String },
          title: { type: String },
          examName: { type: String },
          schoolName: { type: String },
          examCenter: { type: String },
          footerText: { type: String },
          leftLogo: { type: String },
          rightLogo: { type: String },
          sign: { type: String },
          backgroundImage: { type: String },
          toggles: {
               name: { type: Boolean, default: false },
               fatherName: { type: Boolean, default: false },
               motherName: { type: Boolean, default: false },
               dateOfBirth: { type: Boolean, default: false },
               admissionNo: { type: Boolean, default: false },
               rollNumber: { type: Boolean, default: false },
               address: { type: Boolean, default: false },
               gender: { type: Boolean, default: false },
               photo: { type: Boolean, default: false },
               class: { type: Boolean, default: false },
               section: { type: Boolean, default: false },
          },
          isActive: { type: Boolean, default: false },
     },
     { timestamps: true }
);

const AdmitCardTemplate = mongoose.models.AdmitCardTemplate || mongoose.model("AdmitCardTemplate", admitCardTemplateSchema);

export default AdmitCardTemplate;
