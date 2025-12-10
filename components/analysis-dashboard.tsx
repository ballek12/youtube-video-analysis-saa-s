"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricsPanel } from "@/components/metrics-panel"
import { TranscriptionPanel } from "@/components/transcription-panel"
import { ViralityPanel } from "@/components/virality-panel"
import { AiInsightsPanel } from "@/components/ai-insights-panel"
import { VideoPreview } from "@/components/video-preview"
import type { AnalysisResult } from "@/lib/types"

interface AnalysisDashboardProps {
  analysis: AnalysisResult
}

export function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Video Preview */}
        <div className="lg:col-span-1">
          <VideoPreview video={analysis.video} />
        </div>

        {/* Analysis Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border/40">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="transcription"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="virality"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Virality
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <MetricsPanel metrics={analysis.metrics} />
            </TabsContent>

            <TabsContent value="transcription" className="mt-6">
              <TranscriptionPanel transcription={analysis.transcription} />
            </TabsContent>

            <TabsContent value="virality" className="mt-6">
              <ViralityPanel virality={analysis.virality} />
            </TabsContent>

            <TabsContent value="insights" className="mt-6">
              <AiInsightsPanel insights={analysis.insights} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
