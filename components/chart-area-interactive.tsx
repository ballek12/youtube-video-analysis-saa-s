"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", views: 222, engagement: 150 },
  { date: "2024-04-02", views: 97, engagement: 180 },
  { date: "2024-04-03", views: 167, engagement: 120 },
  { date: "2024-04-04", views: 242, engagement: 260 },
  { date: "2024-04-05", views: 373, engagement: 290 },
  { date: "2024-04-06", views: 301, engagement: 340 },
  { date: "2024-04-07", views: 245, engagement: 180 },
  { date: "2024-04-08", views: 409, engagement: 320 },
  { date: "2024-04-09", views: 59, engagement: 110 },
  { date: "2024-04-10", views: 261, engagement: 190 },
  { date: "2024-04-11", views: 327, engagement: 350 },
  { date: "2024-04-12", views: 292, engagement: 210 },
  { date: "2024-04-13", views: 342, engagement: 380 },
  { date: "2024-04-14", views: 137, engagement: 220 },
  { date: "2024-04-15", views: 120, engagement: 170 },
  { date: "2024-04-16", views: 138, engagement: 190 },
  { date: "2024-04-17", views: 446, engagement: 360 },
  { date: "2024-04-18", views: 364, engagement: 410 },
  { date: "2024-04-19", views: 243, engagement: 180 },
  { date: "2024-04-20", views: 89, engagement: 150 },
  { date: "2024-04-21", views: 137, engagement: 200 },
  { date: "2024-04-22", views: 224, engagement: 170 },
  { date: "2024-04-23", views: 138, engagement: 230 },
  { date: "2024-04-24", views: 387, engagement: 290 },
  { date: "2024-04-25", views: 215, engagement: 250 },
  { date: "2024-04-26", views: 75, engagement: 130 },
  { date: "2024-04-27", views: 383, engagement: 420 },
  { date: "2024-04-28", views: 122, engagement: 180 },
  { date: "2024-04-29", views: 315, engagement: 240 },
  { date: "2024-04-30", views: 454, engagement: 380 },
  { date: "2024-05-01", views: 165, engagement: 220 },
  { date: "2024-05-02", views: 293, engagement: 310 },
  { date: "2024-05-03", views: 247, engagement: 190 },
  { date: "2024-05-04", views: 385, engagement: 420 },
  { date: "2024-05-05", views: 481, engagement: 390 },
  { date: "2024-05-06", views: 498, engagement: 520 },
  { date: "2024-05-07", views: 388, engagement: 300 },
  { date: "2024-05-08", views: 149, engagement: 210 },
  { date: "2024-05-09", views: 227, engagement: 180 },
  { date: "2024-05-10", views: 293, engagement: 330 },
  { date: "2024-05-11", views: 335, engagement: 270 },
  { date: "2024-05-12", views: 197, engagement: 240 },
  { date: "2024-05-13", views: 197, engagement: 160 },
  { date: "2024-05-14", views: 448, engagement: 490 },
  { date: "2024-05-15", views: 473, engagement: 380 },
  { date: "2024-05-16", views: 338, engagement: 400 },
  { date: "2024-05-17", views: 499, engagement: 420 },
  { date: "2024-05-18", views: 315, engagement: 350 },
  { date: "2024-05-19", views: 235, engagement: 180 },
  { date: "2024-05-20", views: 177, engagement: 230 },
  { date: "2024-05-21", views: 82, engagement: 140 },
  { date: "2024-05-22", views: 81, engagement: 120 },
  { date: "2024-05-23", views: 252, engagement: 290 },
  { date: "2024-05-24", views: 294, engagement: 220 },
  { date: "2024-05-25", views: 201, engagement: 250 },
  { date: "2024-05-26", views: 213, engagement: 170 },
  { date: "2024-05-27", views: 420, engagement: 460 },
  { date: "2024-05-28", views: 233, engagement: 190 },
  { date: "2024-05-29", views: 78, engagement: 130 },
  { date: "2024-05-30", views: 340, engagement: 280 },
  { date: "2024-05-31", views: 178, engagement: 230 },
  { date: "2024-06-01", views: 178, engagement: 200 },
  { date: "2024-06-02", views: 470, engagement: 410 },
  { date: "2024-06-03", views: 103, engagement: 160 },
  { date: "2024-06-04", views: 439, engagement: 380 },
  { date: "2024-06-05", views: 88, engagement: 140 },
  { date: "2024-06-06", views: 294, engagement: 250 },
  { date: "2024-06-07", views: 323, engagement: 370 },
  { date: "2024-06-08", views: 385, engagement: 320 },
  { date: "2024-06-09", views: 438, engagement: 480 },
  { date: "2024-06-10", views: 155, engagement: 200 },
  { date: "2024-06-11", views: 92, engagement: 150 },
  { date: "2024-06-12", views: 492, engagement: 420 },
  { date: "2024-06-13", views: 81, engagement: 130 },
  { date: "2024-06-14", views: 426, engagement: 380 },
  { date: "2024-06-15", views: 307, engagement: 350 },
  { date: "2024-06-16", views: 371, engagement: 310 },
  { date: "2024-06-17", views: 475, engagement: 520 },
  { date: "2024-06-18", views: 107, engagement: 170 },
  { date: "2024-06-19", views: 341, engagement: 290 },
  { date: "2024-06-20", views: 408, engagement: 450 },
  { date: "2024-06-21", views: 169, engagement: 210 },
  { date: "2024-06-22", views: 317, engagement: 270 },
  { date: "2024-06-23", views: 480, engagement: 530 },
  { date: "2024-06-24", views: 132, engagement: 180 },
  { date: "2024-06-25", views: 141, engagement: 190 },
  { date: "2024-06-26", views: 434, engagement: 380 },
  { date: "2024-06-27", views: 448, engagement: 490 },
  { date: "2024-06-28", views: 149, engagement: 200 },
  { date: "2024-06-29", views: 103, engagement: 160 },
  { date: "2024-06-30", views: 446, engagement: 400 },
]

const chartConfig = {
  metrics: {
    label: "Metrics",
  },
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Video Performance</CardTitle>
          <CardDescription>Showing views and engagement for the last 3 months</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillEngagement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="engagement"
              type="natural"
              fill="url(#fillEngagement)"
              stroke="hsl(var(--chart-2))"
              stackId="a"
            />
            <Area dataKey="views" type="natural" fill="url(#fillViews)" stroke="hsl(var(--chart-1))" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
