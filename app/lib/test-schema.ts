import DocumentAnalysis from "../models/DocumentAnalysis";
import { connectDB } from "./mongodb";

export async function testingSchema() {
    try {
        await connectDB();

        const validEntry = {
            userId: "user123",
            documentName: "Sample Document",
            results: {
                summary: "This is a summary.",
                clauseSummary: ["Clause 1", "Clause 2"],
                riskScore: 75, 
                fairnessScore: 85,
                keyTerms: ["term1", "term2"],
                risks: ["risk1", "risk2"],
                suggestions: ["suggestion1", "suggestion2"],
                traps: ["trap1"],
                redFlags: ["redFlag1"],
            },
            metadata: {
                fileSize: 2048,
                fileType: "pdf",
                processingTime: 120,
            },
        };

        const invalidEntry = { 
            userId: "user999",
            documentName: "Invalid Document Name That Is Way Too Long And Exceeds The Maximum Length Set In The Schema Which Is One Hundred Characters",
            results: {
                summary: "This is an invalid summary.",
                clauseSummary: ["Clause A", "Clause B"],
                riskScore: 150, // Invalid: exceeds max
                fairnessScore: -10, // Invalid: below min
                keyTerms: ["termA", "termB"],
                risks: ["riskA", "riskB"],
                suggestions: ["suggestionA", "suggestionB"],
                traps: ["trapA"],
                redFlags: ["redFlagA"],
            },
            metadata: {
                fileSize: 4096,
                fileType: "txt", // Invalid: not in enum
                processingTime: 200,
            },
        };
        console.log("Testing schema with valid entry");
        const validDoc = new DocumentAnalysis(validEntry);

        try {
            await validDoc.validate();
            console.log("Valid entry passed validation");
        } catch (validationError) {
            console.error("Valid entry failed validation:", validationError);
        }

        console.log("Testing schema with invalid entry");
        const invalidDoc = new DocumentAnalysis(invalidEntry);

        try {
            await invalidDoc.validate();
            console.log("Invalid entry passed validation");
        } catch (validationError) {
            console.error("Invalid entry failed validation:", validationError);
        }

    } catch (error) {
        throw new Error("Database connection failed");
        console.log(error);
    }
}