import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICbseTemplate extends Document {
    name: string;
    classSections: {
        className: string;
        sections: string[];
    }[];
    description?: string;
    created_at: Date;
}

const CbseTemplateSchema: Schema = new Schema({
    name: { type: String, required: true },
    classSections: [
        {
            className: { type: String, required: true },
            sections: [{ type: String, required: true }],
        }
    ],
    description: { type: String },
    created_at: { type: Date, default: Date.now },
});

const CbseTemplate: Model<ICbseTemplate> = mongoose.models.CbseTemplate || mongoose.model<ICbseTemplate>("CbseTemplate", CbseTemplateSchema);
export default CbseTemplate;
