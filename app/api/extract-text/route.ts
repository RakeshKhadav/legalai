import { extractTextFromFile } from "@/app/lib/text-extractor";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file  = formData.get('file') as File;
        if(!file) {
            return new Response('No file uploaded', {status: 400});
        }      

        const extractText = await extractTextFromFile(file);
        return Response.json({ text: extractText, success: true }, {status: 200});
    } catch (error) {
        console.error('Error in /extract-text route:', error);
        return new Response('Failed to extract text', {status: 500});
    }
}