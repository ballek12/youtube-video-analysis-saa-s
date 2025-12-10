"use client"

import { Suspense } from "react"
import { AnalyzeContent } from "@/components/analyze-content"
import { useI18n } from "@/lib/i18n-context"

export default function AnalyzePage() {
  return (
    <Suspense fallback={<AnalyzeLoading />}>
      <AnalyzeContent />
    </Suspense>
  )
}

function AnalyzeLoading() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">{t.analyze.loading}</p>
      </div>
    </div>
  )
}
