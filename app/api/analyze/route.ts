import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import type { AnalysisResult } from "@/lib/types"
import { rateLimit, getClientIp } from "@/lib/rate-limiter"
import { getVideoIdOrThrow } from "@/lib/youtube-utils"

const AI_REQUEST_TIMEOUT = 30000 // 30 seconds

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 10 requests per minute per IP
    const clientIp = getClientIp(request.headers)
    const rateLimitResult = rateLimit(clientIp, {
      maxRequests: 10,
      windowMs: 60 * 1000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // Validate request body
    let url: string
    try {
      const body = await request.json()
      url = body.url
    } catch (error) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required and must be a string" }, { status: 400 })
    }

    // Validate and extract video ID
    let videoId: string
    try {
      videoId = getVideoIdOrThrow(url)
    } catch (error) {
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : "Invalid YouTube URL",
        },
        { status: 400 }
      )
    }

    // Generate AI analysis with timeout
    let aiAnalysis: string
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT)

      const result = await generateText({
        model: "anthropic/claude-sonnet-4-20250514",
        prompt: `You are an expert YouTube video analyst. Generate a comprehensive, realistic analysis for a YouTube video.

Generate a detailed JSON analysis with the following structure. Make it realistic and insightful:

{
  "summary": "A 2-3 sentence summary of what this video is likely about based on typical YouTube content",
  "sentiment": {
    "overall": "positive" or "neutral" or "negative",
    "score": number between 60-95,
    "emotions": ["array of 3-4 detected emotions like excited, informative, engaging, thoughtful"]
  },
  "topics": ["5-6 main topics covered"],
  "keyPoints": ["4-5 key takeaways from the video"],
  "recommendations": [
    {
      "title": "Recommendation title",
      "description": "Detailed recommendation description"
    }
  ]
}

Return ONLY valid JSON, no markdown or explanation.`,
        // @ts-ignore - signal support may vary by SDK version
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      aiAnalysis = result.text
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return NextResponse.json(
            { error: "AI analysis request timed out. Please try again." },
            { status: 504 }
          )
        }
        console.error("AI Generation error:", error.message)
      }
      // Fall back to default insights if AI fails
      aiAnalysis = JSON.stringify(getDefaultInsights())
    }

    let parsedInsights
    try {
      parsedInsights = JSON.parse(aiAnalysis)
      // Validate parsed insights structure
      validateInsights(parsedInsights)
    } catch (error) {
      console.warn("Failed to parse AI insights, using defaults:", error)
      parsedInsights = getDefaultInsights()
    }

    // Generate mock video data
    const mockData: AnalysisResult = {
      video: {
        id: videoId,
        title: "How to Build Amazing Products That Users Love",
        channel: "Tech Insights",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: "14:32",
        views: "1.2M",
        likes: "45.2K",
        comments: "3.4K",
        publishedAt: "Mar 15, 2024",
        description: "In this video, we explore the key principles of building products that resonate with users...",
        tags: ["product", "design", "tech", "startup", "UX"],
      },
      metrics: {
        views: "1,234,567",
        viewsChange: 12.5,
        likes: "45,234",
        likesChange: 8.3,
        comments: "3,456",
        commentsChange: 15.2,
        shares: "12,345",
        sharesChange: 22.1,
        engagementRate: 4.2,
        likeRatio: 3.7,
        engagementData: [
          { date: "Day 1", views: 450000 },
          { date: "Day 2", views: 280000 },
          { date: "Day 3", views: 180000 },
          { date: "Day 4", views: 120000 },
          { date: "Day 5", views: 85000 },
          { date: "Day 6", views: 65000 },
          { date: "Day 7", views: 54567 },
        ],
      },
      transcription: {
        language: "English",
        duration: "14:32",
        wordCount: 2847,
        segments: [
          {
            timestamp: "00:00",
            text: "Hey everyone, welcome back to the channel! Today we're diving into something really exciting.",
          },
          {
            timestamp: "00:15",
            text: "I've been getting a lot of questions about how to build products that users actually love, so let's break it down.",
          },
          {
            timestamp: "00:32",
            text: "First things first - you need to understand your users deeply. This means going beyond just surveys and analytics.",
          },
          {
            timestamp: "00:48",
            text: "Actually talk to your users. Schedule calls, do user interviews, watch them use your product.",
          },
          {
            timestamp: "01:05",
            text: "The insights you'll gain are invaluable and will shape every decision you make going forward.",
          },
          {
            timestamp: "01:22",
            text: "Second, focus on solving one problem really well before expanding to other features.",
          },
          {
            timestamp: "01:38",
            text: "I see so many startups try to do everything at once and end up doing nothing well.",
          },
          {
            timestamp: "01:55",
            text: "Pick your core value proposition and nail it. Make it ten times better than any alternative.",
          },
          {
            timestamp: "02:12",
            text: "Third, iterate quickly but thoughtfully. Speed matters, but so does direction.",
          },
          {
            timestamp: "02:28",
            text: "Ship fast, get feedback, and adjust. But make sure each iteration moves you closer to your vision.",
          },
        ],
      },
      virality: {
        overallScore: 78,
        trend: "rising",
        hookStrength: 85,
        audienceMatch: 72,
        timing: 68,
        shareability: 82,
        factors: [
          { name: "Title Effectiveness", score: 82 },
          { name: "Thumbnail Appeal", score: 75 },
          { name: "Content Quality", score: 88 },
          { name: "Audience Retention", score: 71 },
          { name: "Social Proof", score: 79 },
          { name: "SEO Optimization", score: 65 },
        ],
      },
      insights: {
        summary: parsedInsights.summary,
        sentiment: parsedInsights.sentiment,
        topics: parsedInsights.topics,
        keyPoints: parsedInsights.keyPoints,
        recommendations: parsedInsights.recommendations,
      },
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze video. Please try again later." },
      { status: 500 }
    )
  }
}

/**
 * Get default insights when AI fails
 */
function getDefaultInsights() {
  return {
    summary:
      "This video appears to cover engaging content with good production quality. The creator demonstrates expertise in their subject matter and maintains viewer interest throughout.",
    sentiment: {
      overall: "positive" as const,
      score: 78,
      emotions: ["Engaging", "Informative", "Enthusiastic", "Professional"],
    },
    topics: ["Content Creation", "Digital Media", "Audience Engagement", "Video Production", "Online Growth"],
    keyPoints: [
      "Strong opening hook that captures attention in the first 5 seconds",
      "Clear value proposition delivered early in the video",
      "Consistent pacing that maintains viewer engagement",
      "Effective use of visual elements and B-roll footage",
      "Clear call-to-action that encourages interaction",
    ],
    recommendations: [
      {
        title: "Optimize Thumbnail Design",
        description:
          "Consider A/B testing thumbnails with different facial expressions and text overlays to improve click-through rates.",
      },
      {
        title: "Enhance SEO Strategy",
        description:
          "Include more long-tail keywords in the description and add timestamps for better search visibility.",
      },
      {
        title: "Improve Retention",
        description:
          "Add more pattern interrupts in the middle section to maintain viewer attention throughout the video.",
      },
    ],
  }
}

/**
 * Validate insights structure
 */
function validateInsights(insights: any): void {
  if (!insights.summary || typeof insights.summary !== "string") {
    throw new Error("Invalid insights: missing or invalid summary")
  }
  if (!insights.sentiment || typeof insights.sentiment !== "object") {
    throw new Error("Invalid insights: missing or invalid sentiment")
  }
  if (!Array.isArray(insights.topics)) {
    throw new Error("Invalid insights: topics must be an array")
  }
  if (!Array.isArray(insights.keyPoints)) {
    throw new Error("Invalid insights: keyPoints must be an array")
  }
  if (!Array.isArray(insights.recommendations)) {
    throw new Error("Invalid insights: recommendations must be an array")
  }
}
