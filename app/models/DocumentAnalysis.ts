import mongoose, { Schema, Document } from "mongoose";

interface IDocumentAnalysis extends Document {
    userId: string,
    documentName: string,
    results: {
        summary: string,
        clauseSummary: string[],
        riskScore: number,
        fairnessScore: number,
        keyTerms: string[],
        risks: string[],
        suggestions: string[],
        traps?: string[],
        redFlags?: string[],
    },
    metadata: {
        fileSize: number,
        fileType: string,
        processingTime: number,
    },
}

const DocumentAnalysisSchema = new Schema<IDocumentAnalysis>({
    userId: { type: String, required: true },
    documentName: { type: String, required: true, maxlength: [100, "Document name cannot exceed 100 characters."] },
    results: {
        summary: { type: String, required: true },
        clauseSummary: { type: [String], required: true },
        riskScore: { type: Number, required: true, min: [0, "Risk score must be at least 0."], max: [100, "Risk score must be at most 100."] },
        fairnessScore: { type: Number, required: true, min: [0, "Fairness score must be at least 0."], max: [100, "Fairness score must be at most 100."] },
        keyTerms: { type: [String], required: true },
        risks: { type: [String], required: true },
        suggestions: { type: [String], required: true },
        traps: { type: [String], required: false },
        redFlags: { type: [String], required: false },
    },
    metadata: {
        fileSize: { type: Number, required: true },
        fileType: { type: String, required: true, enum: { values: ["pdf", "docx"], message: "File type must be either 'pdf' or 'docx'." } },
        processingTime: { type: Number, required: true },
    },
}, { timestamps: true });

DocumentAnalysisSchema.index({ documentName: "text", userId: 1 });

const DocumentAnalysis = mongoose.models.DocumentAnalysis || mongoose.model<IDocumentAnalysis>("DocumentAnalysis", DocumentAnalysisSchema);

export default DocumentAnalysis;

