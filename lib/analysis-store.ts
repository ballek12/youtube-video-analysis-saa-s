import type { AnalysisResult } from "./types"
import { createClient } from "@/lib/supabase/client"
import type { Tables } from "@/lib/supabase/database.types"

type AnalysisRow = Tables<"analyses">

export interface SavedAnalysis {
  id: string
  url: string
  videoTitle: string
  thumbnail: string
  analyzedAt: string
  result: AnalysisResult
}

function mapRowToSavedAnalysis(row: AnalysisRow): SavedAnalysis {
  return {
    id: row.id,
    url: row.url,
    videoTitle: row.video_title,
    thumbnail: row.thumbnail,
    analyzedAt: row.analyzed_at,
    result: row.result as AnalysisResult,
  }
}

export async function saveAnalysis(userId: string, url: string, result: AnalysisResult): Promise<SavedAnalysis> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("analyses")
    .insert({
      user_id: userId,
      url,
      video_id: result.video.id,
      video_title: result.video.title,
      thumbnail: result.video.thumbnail,
      result: result as any,
    })
    .select()
    .single()

  if (error) {
    console.error("Error saving analysis:", error)
    throw error
  }

  return mapRowToSavedAnalysis(data)
}

export async function getAnalyses(userId: string): Promise<SavedAnalysis[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("user_id", userId)
    .order("analyzed_at", { ascending: false })
    .limit(50)

  if (error) {
    console.error("Error fetching analyses:", error)
    return []
  }

  return data.map(mapRowToSavedAnalysis)
}

export async function deleteAnalysis(userId: string, analysisId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from("analyses")
    .delete()
    .eq("id", analysisId)
    .eq("user_id", userId)

  if (error) {
    console.error("Error deleting analysis:", error)
    throw error
  }
}

export async function getAnalysisById(userId: string, analysisId: string): Promise<SavedAnalysis | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", analysisId)
    .eq("user_id", userId)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null
    }
    console.error("Error fetching analysis:", error)
    return null
  }

  return mapRowToSavedAnalysis(data)
}
