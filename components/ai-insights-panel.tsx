"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, Target, AlertCircle, CheckCircle, Sparkles } from "lucide-react"
import type { AiInsights } from "@/lib/types"

interface AiInsightsPanelProps {
  insights: AiInsights
}

export function AiInsightsPanel({ insights }: AiInsightsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="bg-card/50 border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Brain className="h-5 w-5 text-primary" />
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90 leading-relaxed">{insights.summary}</p>
        </CardContent>
      </Card>

      {/* Sentiment & Topics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Sparkles className="h-5 w-5 text-chart-3" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div
                className={`text-4xl font-bold ${
                  insights.sentiment.overall === "positive"
                    ? "text-chart-2"
                    : insights.sentiment.overall === "negative"
                      ? "text-destructive"
                      : "text-chart-3"
                }`}
              >
                {insights.sentiment.score}%
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className={`capitalize ${
                    insights.sentiment.overall === "positive"
                      ? "bg-chart-2/20 text-chart-2"
                      : insights.sentiment.overall === "negative"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-chart-3/20 text-chart-3"
                  }`}
                >
                  {insights.sentiment.overall}
                </Badge>
                <p className="mt-1 text-xs text-muted-foreground">Overall tone</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {insights.sentiment.emotions.map((emotion) => (
                <Badge key={emotion} variant="outline" className="border-border/60 text-xs">
                  {emotion}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Target className="h-5 w-5 text-primary" />
              Main Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topics.map((topic, index) => (
                <Badge
                  key={topic}
                  className={`${
                    index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Points */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Lightbulb className="h-5 w-5 text-chart-3" />
            Key Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {insights.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-chart-2 mt-0.5" />
                <span className="text-sm text-foreground/90 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <AlertCircle className="h-5 w-5 text-chart-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{rec.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
