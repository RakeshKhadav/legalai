import { analyzeDocument } from "@/app/lib/gemini-service";
import { extractTextFromFile } from "@/app/lib/text-extractor";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if(!file) {
            return new Response('No file uploaded', {status: 400});
        }

        const extractText = await extractTextFromFile(file);
        const analyzeExtractText = await analyzeDocument(extractText);

        return Response.json({
            data: analyzeExtractText,
            success: true,
        }, { status: 200 });

    } catch (error) {
        return Response.json({
            success: false,
            error: "There was an error: " + error,
        }, { status: 500 });
    }
}