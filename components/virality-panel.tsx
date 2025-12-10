"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Flame, Zap, Target, Clock, BarChart } from "lucide-react"
import type { Virality } from "@/lib/types"
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts"

interface ViralityPanelProps {
  virality: Virality
}

export function ViralityPanel({ virality }: ViralityPanelProps) {
  const scoreData = [{ score: virality.overallScore, fill: "oklch(0.65 0.25 265)" }]

  return (
    <div className="space-y-6">
      {/* Main Virality Score */}
      <Card className="bg-card/50 border-border/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-8">
            <div className="relative h-40 w-40">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  data={scoreData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: "oklch(0.20 0.01 260)" }} dataKey="score" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{virality.overallScore}</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Flame className="h-5 w-5 text-chart-5" />
                Virality Score
              </h3>
              <p className="mt-2 text-muted-foreground">
                {virality.overallScore >= 80
                  ? "Excellent viral potential! This content has strong characteristics for wide reach."
                  : virality.overallScore >= 60
                    ? "Good viral potential with room for optimization."
                    : "Moderate viral potential. Consider the recommendations below."}
              </p>
              <div className="mt-4 flex gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    virality.trend === "rising" ? "bg-chart-2/20 text-chart-2" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <TrendingUp className="h-3 w-3" />
                  {virality.trend === "rising" ? "Trending Up" : "Stable"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <ScoreCard
          icon={Zap}
          title="Hook Strength"
          score={virality.hookStrength}
          description="First 30 seconds impact"
        />
        <ScoreCard
          icon={Target}
          title="Audience Match"
          score={virality.audienceMatch}
          description="Target demographic fit"
        />
        <ScoreCard icon={Clock} title="Timing" score={virality.timing} description="Optimal posting time" />
        <ScoreCard
          icon={BarChart}
          title="Shareability"
          score={virality.shareability}
          description="Social share potential"
        />
      </div>

      {/* Factors Analysis */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle className="text-base font-medium">Virality Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {virality.factors.map((factor, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{factor.name}</span>
                  <span className="text-sm text-muted-foreground">{factor.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${factor.score}%`,
                      background:
                        factor.score >= 70
                          ? "oklch(0.70 0.18 180)"
                          : factor.score >= 40
                            ? "oklch(0.75 0.15 85)"
                            : "oklch(0.55 0.22 25)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScoreCard({
  icon: Icon,
  title,
  score,
  description,
}: {
  icon: React.ElementType
  title: string
  score: number
  description: string
}) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-chart-2"
    if (s >= 60) return "text-chart-3"
    return "text-chart-5"
  }

  return (
    <Card className="bg-card/50 border-border/40">
      <CardContent className="p-4">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <p className={`mt-3 text-3xl font-bold ${getScoreColor(score)}`}>{score}</p>
        <p className="mt-1 text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
