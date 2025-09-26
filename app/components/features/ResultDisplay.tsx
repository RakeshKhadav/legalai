import { IAnalyzeResult } from '@/app/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ResultDisplay = (props: { result: IAnalyzeResult }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Analysis Result</h1>
        <p className="text-muted-foreground">Comprehensive legal document analysis</p>
      </div>
      
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">{props.result.documentName}</CardTitle>
          <CardDescription>Document analysis overview</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-left duration-500">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{props.result.results.summary}</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-right duration-500">
          <CardHeader>
            <CardTitle className="text-lg">Clause Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {props.result.results.clauseSummary.map((clsum, index) => (
              <p key={index} className="text-sm p-2 bg-muted rounded-md transition-colors hover:bg-muted/80">{clsum}</p>
            ))}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-left duration-700">
          <CardHeader>
            <CardTitle className="text-lg">Key Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {props.result.results.keyTerms.map((keyterm, index) => (
                <Badge key={index} variant="secondary" className="transition-transform hover:scale-105">{keyterm}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-right duration-700">
          <CardHeader>
            <CardTitle className="text-lg">Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {props.result.results.risks.map((suggestion, index) => (
              <div key={index} className="text-sm p-3 bg-blue-50 border-l-4 border-blue-400 rounded transition-colors hover:bg-blue-100">
                {suggestion}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-left duration-900">
          <CardHeader>
            <CardTitle className="text-lg text-orange-700">Risks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {props.result.results.risks.map((risk, index) => (
              <div key={index} className="text-sm p-3 bg-orange-50 border-l-4 border-orange-400 rounded transition-colors hover:bg-orange-100">
                {risk}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-right duration-900">
          <CardHeader>
            <CardTitle className="text-lg text-red-700">Traps</CardTitle>
          </CardHeader>
          <CardContent>
            {props.result.results.traps ? (
              <div className="space-y-2">
                {props.result.results.traps.map((trap, index) => (
                  <div key={index} className="text-sm p-3 bg-red-50 border-l-4 border-red-400 rounded transition-colors hover:bg-red-100">
                    {trap}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-600 p-3 bg-green-50 rounded">There are no traps detected.</p>
            )}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-left duration-1000">
          <CardHeader>
            <CardTitle className="text-lg text-red-700">Red Flags</CardTitle>
          </CardHeader>
          <CardContent>
            {props.result.results.redFlags ? (
              <div className="space-y-2">
                {props.result.results.redFlags.map((redFlag, index) => (
                  <div key={index} className="text-sm p-3 bg-red-50 border-l-4 border-red-500 rounded transition-colors hover:bg-red-100">
                    {redFlag}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-600 p-3 bg-green-50 rounded">No red flags detected.</p>
            )}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-right duration-1000">
          <CardHeader>
            <CardTitle className="text-lg">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{props.result.results.riskScore}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${Math.min(props.result.results.riskScore, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-in slide-in-from-left duration-1100">
          <CardHeader>
            <CardTitle className="text-lg">Fairness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{props.result.results.fairnessScore}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${Math.min(props.result.results.fairnessScore, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResultDisplay