"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { History, Clock, Trash2, Search } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { getAnalyses, deleteAnalysis, type SavedAnalysis } from "@/lib/analysis-store"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export default function HistoryPage() {
  const { user } = useAuth()
  const { t } = useI18n()
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (user) {
      getAnalyses(user.id).then(setAnalyses)
    }
  }, [user])

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

  const filteredAnalyses = analyses.filter((a) => a.videoTitle.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t.sidebar.history}</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {t.dashboard.analysisHistoryDesc}
            </p>
          </div>
          {analyses.length > 0 && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t.dashboard.searchAnalyses}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            {filteredAnalyses.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 sm:p-12 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-muted">
                  <History className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
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
                      <h3 className="font-medium line-clamp-2 text-sm mb-2">{analysis.videoTitle}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {analysis.result.virality.overallScore}% {t.dashboard.viral}
                        </span>
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

