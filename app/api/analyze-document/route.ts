import { analyzeDocument } from "@/app/lib/gemini-service";
import { extractTextFromFile } from "@/app/lib/text-extractor";
import DocumentAnalysis from "@/app/models/DocumentAnalysis";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(request: Request) {

    try {

        const startTime = Date.now();

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if(!file) {
            return new Response('No file uploaded', {status: 400});
        }

        const fileSize = file.size;
        const fileType = file.name.split('.').pop()?.toLowerCase();

        const extractText = await extractTextFromFile(file);
        const analyzeExtractText = await analyzeDocument(extractText);

        const { userId } = await auth();
        if (!userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const endTime = Date.now();
        const processingTime = (endTime - startTime) / 1000; // in seconds

        await connectDB();

        const body = {
            userId: userId,
            ...analyzeExtractText,
            metadata: {
                fileSize: fileSize,
                fileType: fileType,
                processingTime: processingTime,
            },
        };

        // console.log("Object to be saved:", JSON.stringify(body, null, 2));
        const newAnalysis = new DocumentAnalysis(body);
        
        const savedAnalysis = await newAnalysis.save();
        
        return Response.json({
            data: savedAnalysis,
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.error("--- FULL ERROR ---", error);
        return Response.json({
            success: false,
            error: "There was an error: " + error,
        }, { status: 500 });
    }
}