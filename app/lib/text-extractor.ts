const pdf =  require('pdf-parse');
const mammoth = require('mammoth');

function cleanExtractedText(text: string): string {
    const cleanedText = text.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
    return cleanedText;
}

async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
    try {
        const pdfBuffer = Buffer.from(buffer);
        const data = await pdf(pdfBuffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF');
    }
}

async function extractTextFromDocx(buffer: ArrayBuffer): Promise<string> {
    try {
        const resultDocx = await mammoth.extractRawText({buffer: Buffer.from(buffer)});
        return resultDocx.value;
    } catch (error) {
        console.error('Error extracting text from DOCX:', error);
        throw new Error('Failed to extract text from DOCX');
    }
}

export async function extractTextFromFile(file: File): Promise<string> {

    try {
        const arrayBuffer = await file.arrayBuffer();

        let rawText: string;

        if(file.type === 'application/pdf') {
            rawText = await extractTextFromPDF(arrayBuffer);
        } else if(file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            rawText = await extractTextFromDocx(arrayBuffer);
        } else {
            throw new Error('Unsupported file type. Only PDF and DOCX are supported.');
        }

        console.log('Raw Extracted Text:', rawText);
        

        return cleanExtractedText(rawText);
    } catch (error) {
        console.error('Error extracting text from file:', error);
        throw new Error('Failed to extract text from file');
    }
}