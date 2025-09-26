import { z } from "zod";

export const AnalyzeResultSchema = z.object({
    documentName: z.string().max(100, "Document name cannot exceed 100 characters."),
    results: z.object({
        summary: z.string(),
        clauseSummary: z.array(z.string()),
        riskScore: z.number().min(0).max(100),
        fairnessScore: z.number().min(0).max(100),
        keyTerms: z.array(z.string()),
        risks: z.array(z.string()),
        suggestions: z.array(z.string()),
        traps: z.array(z.string()).optional(),
        redFlags: z.array(z.string()).optional(),
    }),
});

export type IAnalyzeResult = z.infer<typeof AnalyzeResultSchema>;

export interface IGeminiAnalyzeResponse {
    success: boolean;
    data?: IAnalyzeResult;
    error?: string;
}

export const GeminiAnalyzeResponseSchema = z.object({
    success: z.boolean(),
    data: AnalyzeResultSchema.optional(),
    error: z.string().optional(),
});
