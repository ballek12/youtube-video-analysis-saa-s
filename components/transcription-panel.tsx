"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Download, Search, Check } from "lucide-react"
import type { Transcription } from "@/lib/types"

interface TranscriptionPanelProps {
  transcription: Transcription
}

export function TranscriptionPanel({ transcription }: TranscriptionPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

  const filteredSegments = transcription.segments.filter((segment) =>
    segment.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCopy = async () => {
    const fullText = transcription.segments.map((s) => s.text).join(" ")
    await navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const fullText = transcription.segments.map((s) => `[${s.timestamp}] ${s.text}`).join("\n")
    const blob = new Blob([fullText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcription.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-card/50 border-border/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Full Transcription</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="border-border/60 bg-transparent">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="border-border/60 bg-transparent">
              <Download className="h-4 w-4" />
              <span className="ml-2">Export</span>
            </Button>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search in transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 border-border/60"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Language:</span>
            <span className="font-medium">{transcription.language}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{transcription.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Words:</span>
            <span className="font-medium">{transcription.wordCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
          {filteredSegments.map((segment, index) => (
            <div key={index} className="group flex gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
              <span className="shrink-0 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded h-fit">
                {segment.timestamp}
              </span>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {searchQuery ? highlightText(segment.text, searchQuery) : segment.text}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function highlightText(text: string, query: string) {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query})`, "gi"))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
