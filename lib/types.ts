export interface VideoInfo {
  id: string
  title: string
  channel: string
  thumbnail: string
  duration: string
  views: string
  likes: string
  comments: string
  publishedAt: string
  description: string
  tags: string[]
}

export interface Metrics {
  views: string
  viewsChange: number
  likes: string
  likesChange: number
  comments: string
  commentsChange: number
  shares: string
  sharesChange: number
  engagementRate: number
  likeRatio: number
  engagementData: {
    date: string
    views: number
  }[]
}

export interface TranscriptionSegment {
  timestamp: string
  text: string
}

export interface Transcription {
  language: string
  duration: string
  wordCount: number
  segments: TranscriptionSegment[]
}

export interface ViralityFactor {
  name: string
  score: number
}

export interface Virality {
  overallScore: number
  trend: "rising" | "stable" | "declining"
  hookStrength: number
  audienceMatch: number
  timing: number
  shareability: number
  factors: ViralityFactor[]
}

export interface Recommendation {
  title: string
  description: string
}

export interface AiInsights {
  summary: string
  sentiment: {
    overall: "positive" | "neutral" | "negative"
    score: number
    emotions: string[]
  }
  topics: string[]
  keyPoints: string[]
  recommendations: Recommendation[]
}

export interface AnalysisResult {
  video: VideoInfo
  metrics: Metrics
  transcription: Transcription
  virality: Virality
  insights: AiInsights
}
