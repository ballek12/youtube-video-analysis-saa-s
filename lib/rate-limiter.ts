/**
 * Simple in-memory rate limiter for development
 * For production, consider using Redis or Vercel KV
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number // in milliseconds
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetAt: number
}

/**
 * Rate limit a request based on identifier (IP, user ID, etc)
 * @param identifier - Unique identifier (e.g., IP address or user ID)
 * @param config - Rate limit configuration
 * @returns RateLimitResult
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60 * 1000 }
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Create new entry if doesn't exist or window expired
  if (!entry || entry.resetAt < now) {
    const resetAt = now + config.windowMs
    rateLimitStore.set(identifier, { count: 1, resetAt })
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetAt,
    }
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  // Increment counter
  entry.count++
  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Get IP address from NextRequest headers
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return headers.get('x-real-ip') || 'unknown'
}
