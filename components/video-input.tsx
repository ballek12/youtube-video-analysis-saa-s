"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, ArrowRight, Loader2 } from "lucide-react"

interface VideoInputProps {
  initialUrl?: string
  onAnalyze: (url: string) => void
  isLoading?: boolean
  disabled?: boolean
}

export function VideoInput({ initialUrl = "", onAnalyze, isLoading, disabled }: VideoInputProps) {
  const [url, setUrl] = useState(initialUrl)

  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl)
    }
  }, [initialUrl])

  const handleSubmit = () => {
    if (url.trim() && !isLoading && !disabled) {
      onAnalyze(url.trim())
    }
  }

  return (
    <div className="text-center px-2 sm:px-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Analyze any YouTube video</h1>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
        Paste a YouTube URL to get AI-powered insights, transcription, and metrics
      </p>

      <div className="mt-6 sm:mt-8 flex flex-col gap-3 max-w-2xl mx-auto sm:flex-row">
        <div className="relative flex-1 w-full">
          <Play className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="h-11 sm:h-12 pl-10 sm:pl-11 text-sm sm:text-base bg-card border-border/60 focus-visible:ring-primary"
            disabled={isLoading || disabled}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !url.trim() || disabled}
          className="h-11 sm:h-12 px-4 sm:px-6 bg-primary hover:bg-primary/90 text-sm sm:text-base w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Analyzing...</span>
              <span className="sm:hidden">Analyzing</span>
            </>
          ) : (
            <>
              Analyze
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
