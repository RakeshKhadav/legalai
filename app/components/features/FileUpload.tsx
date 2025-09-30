'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, File, AlertCircle } from 'lucide-react'
import Loading from '../ui/loading'
import { IAnalyzeResult } from '@/app/types'
import ResultDisplay from './ResultDisplay'

const FileUpload = () => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [resultText, setResultText] = useState<IAnalyzeResult | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);

  const extractText = async (file: File) => {
    setIsExtracting(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData
      })
      if(response.ok) {
        const data = await response.json();
        setResultText(data.data);
        setError('');
      } else {
        setError('Failed to extract text from the document.');
        setResultText(null);
      }
    } catch (error) {
      setError('An error occurred while extracting text.' + error);
      setResultText(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size exceeds 10MB limit.');
        setSelectedFile(null);
      } else if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setError('Unsupported file type. Please upload a PDF or DOCX file.');
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        setError('');
      }
    }
  }

  const handleAnalyze = () => {
    if (selectedFile) {
      setIsExtracting(true);
      extractText(selectedFile);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Upload Zone */}
      <Card className="border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <Upload className="mx-auto h-16 w-16 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Upload Legal Document
              </h3>
              <p className="text-gray-500 mt-2">
                Select a PDF or DOCX file to analyze (Max 10MB)
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                Choose File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Selected File Display */}
      {selectedFile && !error && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <File className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">{selectedFile.name}</p>
                  <p className="text-sm text-green-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {isExtracting ? (
                <Loading />
              ) : (
                <Button
                  onClick={handleAnalyze}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Analyze Document
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {resultText && !error && <ResultDisplay result={resultText} />}
    </div>
  )
}

export default FileUpload