"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { VideoInput } from "@/components/video-input"
import { AnalysisDashboard } from "@/components/analysis-dashboard"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { saveAnalysis, getAnalysisById } from "@/lib/analysis-store"
import { isValidYouTubeUrl } from "@/lib/youtube-utils"
import { toast } from "sonner"
import type { AnalysisResult } from "@/lib/types"

export function AnalyzeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlParam = searchParams.get("url")
  const idParam = searchParams.get("id")

  const { user, updateUser, isLoading: authLoading } = useAuth()
  const { t } = useI18n()

  const [videoUrl, setVideoUrl] = useState(urlParam || "")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  useEffect(() => {
    if (idParam && user && !analysis) {
      getAnalysisById(user.id, idParam).then((saved) => {
        if (saved) {
          setAnalysis(saved.result)
          setVideoUrl(saved.url)
        }
      })
    }
  }, [idParam, user, analysis])

  useEffect(() => {
    if (urlParam && user && !analysis && !hasAnalyzed && !authLoading) {
      handleAnalyze(urlParam)
    }
  }, [urlParam, user, authLoading])

  const handleAnalyze = async (url: string) => {
    if (!user) {
      toast.error(t.analyze.pleaseSignIn)
      router.push("/login")
      return
    }

    // Validate URL before attempting analysis
    if (!isValidYouTubeUrl(url)) {
      const message = "Please provide a valid YouTube URL"
      setError(message)
      toast.error(message)
      return
    }

    if (user.credits <= 0) {
      toast.error(t.analyze.noCredits)
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setVideoUrl(url)
    setHasAnalyzed(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const data = await response.json()
        const errorMessage = data.error || t.analyze.failedToAnalyze
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setAnalysis(data)

      await saveAnalysis(user.id, url, data)
      await updateUser({ credits: user.credits - 1 })

      toast.success(t.analyze.analysisComplete)
    } catch (err) {
      const message = err instanceof Error ? err.message : t.analyze.failedToAnalyze
      setError(message)
      toast.error(message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-border/40 bg-card/30 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold">{t.analyze.signInToAnalyze}</h2>
          <p className="mt-2 text-muted-foreground">{t.analyze.createAccountDesc}</p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => router.push("/signup")}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t.analyze.createFreeAccount}
            </button>
            <button
              onClick={() => router.push("/login")}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-card transition-colors"
            >
              {t.analyze.signIn}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto w-full">
        <VideoInput initialUrl={videoUrl} onAnalyze={handleAnalyze} isLoading={isAnalyzing} disabled={!user} />

        {error && (
          <div className="mt-4 sm:mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-destructive">
            {error}
          </div>
        )}

        {isAnalyzing && <AnalysisLoading />}

        {analysis && !isAnalyzing && <AnalysisDashboard analysis={analysis} />}
      </div>
    </DashboardLayout>
  )
}

function AnalysisLoading() {
  const { t } = useI18n()
  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-primary/20 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium">{t.analyze.analyzingVideo}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.analyze.mayTakeSeconds}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {[t.analyze.extractingData, t.analyze.transcribing, t.analyze.aiAnalysis].map((step, i) => (
          <div
            key={step}
            className="flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}
