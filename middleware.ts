import { createServerClient } from '@supabase/ssr'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/analyze", "/history", "/profile", "/settings", "/billing", "/upgrade"]

// Public routes that should redirect to dashboard if authenticated
const authRoutes = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthenticated = !!session

  // Redirect authenticated users away from auth pages
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Redirect unauthenticated users from protected routes to login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
}
