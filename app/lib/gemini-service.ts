import { GoogleGenerativeAI } from "@google/generative-ai";
import { IAnalyzeResult } from "../types";

if(!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

export async function analyzeDocument(text: string): Promise<IAnalyzeResult> {
    try {
        const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const response = await model.generateContent(`
            Analyze the following document and return a JSON object with these properties:
            {
                "documentName": "string up to 100 characters",
                "results": {
                    "summary": "string",
                    "clauseSummary": ["list of clause summaries"],
                    "riskScore": "number from 1-10",
                    "fairnessScore": "number from 1-10",
                    "keyTerms": ["important terms"],
                    "risks": ["potential risks"],
                    "suggestions": ["improvement suggestions"],
                    "traps": ["potential traps"],
                    "redFlags": ["concerning items"]
                }
            }
            
            Document to analyze:\n${text}
        `);
        const result = await response.response.text();
        return JSON.parse(result) as IAnalyzeResult;
        
    } catch (error) {
        console.error("Error analyzing document:", error);
        throw new Error("Failed to analyze document");
    }
}