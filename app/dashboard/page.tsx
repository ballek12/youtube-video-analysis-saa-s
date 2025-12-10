"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ArrowRight, Clock, Trash2, BarChart3, TrendingUp, FileText, Sparkles, Search, Crown } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { getAnalyses, deleteAnalysis, type SavedAnalysis } from "@/lib/analysis-store"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { t } = useI18n()
  const router = useRouter()
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [videoUrl, setVideoUrl] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user && !isLoading) {
      getAnalyses(user.id).then(setAnalyses)
    }
  }, [user, isLoading])

  const handleDelete = async (id: string) => {
    if (user) {
      try {
        await deleteAnalysis(user.id, id)
        const updated = await getAnalyses(user.id)
        setAnalyses(updated)
        toast.success(t.dashboard.analysisDeleted)
      } catch (error) {
        console.error("Error deleting analysis:", error)
        toast.error("Erreur lors de la suppression")
      }
    }
  }

  const handleAnalyze = () => {
    if (!videoUrl.trim()) {
      toast.error(t.dashboard.enterUrl)
      return
    }
    if (user && user.credits <= 0) {
      toast.error(t.dashboard.noCredits)
      return
    }
    router.push(`/analyze?url=${encodeURIComponent(videoUrl)}`)
  }

  const filteredAnalyses = analyses.filter((a) => a.videoTitle.toLowerCase().includes(searchQuery.toLowerCase()))

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">{t.common?.loading || "Chargement..."}</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{t.dashboard.welcomeBack}, {user.name.split(" ")[0]}</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{t.dashboard.subtitle}</p>
          </div>
          {user.plan === "free" && (
            <Link href="/upgrade" className="flex-shrink-0">
              <Button className="gap-2 w-full md:w-auto text-sm sm:text-base">
                <Crown className="h-4 w-4" />
                {t.sidebar.upgradeToPro}
              </Button>
            </Link>
          )}
        </div>

        {/* Quick Analysis Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Play className="h-4 w-4" />
              {t.dashboard.quickAnalysis}
            </CardTitle>
            <CardDescription>{t.dashboard.quickAnalysisDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Play className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  className="pl-9"
                />
              </div>
              <Button onClick={handleAnalyze} className="gap-2">
                {t.dashboard.analyze}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.totalAnalyses}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyses.length}</div>
              <p className="text-xs text-muted-foreground">{t.dashboard.videosAnalyzed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.avgVirality}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyses.length > 0
                  ? Math.round(analyses.reduce((acc, a) => acc + a.result.virality.overallScore, 0) / analyses.length)
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">{t.dashboard.averageScore}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.wordsTranscribed}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyses.reduce((acc, a) => acc + a.result.transcription.wordCount, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{t.dashboard.totalWords}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.currentPlan}</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user.plan}</div>
              <p className="text-xs text-muted-foreground">{user.credits} {t.dashboard.creditsLeft}</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <ChartAreaInteractive />

        {/* Analysis History */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>{t.dashboard.analysisHistory}</CardTitle>
                <CardDescription>{t.dashboard.analysisHistoryDesc}</CardDescription>
              </div>
              {analyses.length > 0 && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={t.dashboard.searchAnalyses}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {filteredAnalyses.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 sm:p-12 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-muted">
                  <Play className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{t.dashboard.noAnalyses}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  {searchQuery ? t.dashboard.noResults : t.dashboard.getStarted}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {filteredAnalyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="group rounded-lg border overflow-hidden hover:border-foreground/20 transition-colors"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={
                          analysis.thumbnail || "/placeholder.svg?height=180&width=320&query=youtube video thumbnail"
                        }
                        alt={analysis.videoTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(analysis.analyzedAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-2 text-sm">{analysis.videoTitle}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold">{analysis.result.virality.overallScore}% {t.dashboard.viral}</span>
                        <div className="flex items-center gap-2">
                          <Link href={`/analyze?id=${analysis.id}`}>
                            <Button variant="ghost" size="sm">
                              {t.dashboard.view}
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(analysis.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
