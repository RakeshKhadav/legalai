import { GoogleGenerativeAI } from "@google/generative-ai";
import { IAnalyzeResult, AnalyzeResultSchema } from "../types";

if(!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

function extractJSON(text: string): string {
    // Remove markdown code blocks
    const cleaned = text.replace(/```json\s*|\s*```/g, '');
    // Find JSON object boundaries
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}') + 1;
    return cleaned.slice(start, end);
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
                    "riskScore": "number from 1-100",
                    "fairnessScore": "number from 1-100",
                    "keyTerms": ["important terms"],
                    "risks": ["potential risks"],
                    "suggestions": ["improvement suggestions"],
                    "traps": ["potential traps"],
                    "redFlags": ["concerning items"]
                }
            }

            Return ONLY the JSON object. Do not wrap it in markdown code blocks or add any additional text. Start your response with { and end with }.
            
            Document to analyze:\n${text}
        `);
        
        const result = await response.response.text();
        const cleanJSON = extractJSON(result);

        const validateResult = AnalyzeResultSchema.parse(JSON.parse(cleanJSON));
        if (!validateResult) {
            throw new Error("Invalid response format");
        }

        return validateResult as IAnalyzeResult;

    } catch (error) {
        console.error("Error analyzing document:", error);
        throw new Error("Failed to analyze document");
    }
}