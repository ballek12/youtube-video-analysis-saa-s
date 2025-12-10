"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Eye, ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import type { Metrics } from "@/lib/types"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface MetricsPanelProps {
  metrics: Metrics
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <MetricCard title="Total Views" value={metrics.views} change={metrics.viewsChange} icon={Eye} />
        <MetricCard title="Likes" value={metrics.likes} change={metrics.likesChange} icon={ThumbsUp} />
        <MetricCard title="Comments" value={metrics.comments} change={metrics.commentsChange} icon={MessageCircle} />
        <MetricCard title="Shares" value={metrics.shares} change={metrics.sharesChange} icon={Share2} />
      </div>

      {/* Engagement Chart */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle className="text-base font-medium">Engagement Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.engagementData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.65 0.25 265)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.65 0.25 265)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="oklch(0.60 0 0)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="oklch(0.60 0 0)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.12 0.01 260)",
                    border: "1px solid oklch(0.22 0.01 260)",
                    borderRadius: "8px",
                    color: "oklch(0.98 0 0)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="oklch(0.65 0.25 265)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Rate */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-medium">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-chart-2">{metrics.engagementRate}%</span>
              <span className="text-sm text-muted-foreground mb-1">of viewers engaged</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-chart-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(metrics.engagementRate * 10, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-medium">Like to View Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-chart-3">{metrics.likeRatio}%</span>
              <span className="text-sm text-muted-foreground mb-1">viewers liked</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-chart-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(metrics.likeRatio * 10, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string
  value: string
  change: number
  icon: React.ElementType
}) {
  const TrendIcon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus
  const trendColor = change > 0 ? "text-chart-2" : change < 0 ? "text-destructive" : "text-muted-foreground"

  return (
    <Card className="bg-card/50 border-border/40">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
            <TrendIcon className="h-3 w-3" />
            {Math.abs(change)}%
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}
