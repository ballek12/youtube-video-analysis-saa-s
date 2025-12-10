/**
 * YouTube URL validation and parsing utilities
 */

// Comprehensive regex patterns for YouTube URLs
const YOUTUBE_URL_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  /youtube\.com\/playlist\?list=([^&\n?#]+)/, // Playlist
]

/**
 * Extract and validate YouTube video ID from URL or direct ID
 * @param url - YouTube URL or video ID
 * @returns Video ID if valid, null otherwise
 */
export function extractVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  // Trim whitespace
  const trimmedUrl = url.trim()

  // Check for minimum length
  if (trimmedUrl.length < 11) {
    return null
  }

  // Try to extract video ID
  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = trimmedUrl.match(pattern)
    if (match && match[1]) {
      const videoId = match[1]
      // Validate video ID format: 11 characters, alphanumeric + dash/underscore
      if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return videoId
      }
    }
  }

  return null
}

/**
 * Validate if a URL is a valid YouTube URL
 * @param url - URL to validate
 * @returns true if valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractVideoId(url) !== null
}

/**
 * Sanitize and validate YouTube URL for API requests
 * Prevents malicious URLs from being processed
 * @param url - Raw URL to sanitize
 * @returns Sanitized URL or null if invalid
 */
export function sanitizeYouTubeUrl(url: string): string | null {
  try {
    const videoId = extractVideoId(url)
    if (!videoId) {
      return null
    }
    // Return canonical YouTube URL
    return `https://www.youtube.com/watch?v=${videoId}`
  } catch {
    return null
  }
}

/**
 * Get YouTube video ID from URL, with strict validation
 * @param url - URL to parse
 * @returns Video ID if valid, throws error otherwise
 */
export function getVideoIdOrThrow(url: string): string {
  const videoId = extractVideoId(url)
  if (!videoId) {
    throw new Error('Invalid YouTube URL or video ID. Please provide a valid YouTube video URL.')
  }
  return videoId
}
