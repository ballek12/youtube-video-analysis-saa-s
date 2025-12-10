"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sparkles, User, LogOut, LayoutDashboard, Menu, X, Moon, Sun, Crown } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { useI18n } from "@/lib/i18n-context"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isLanding = pathname === "/"
  const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tools") ||
    pathname.startsWith("/analyze") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/upgrade")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div
        className={cn("mx-auto flex h-16 items-center justify-between px-6", isDashboard ? "max-w-full" : "max-w-7xl")}
      >
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">VidInsight</span>
        </Link>

        {/* Landing page navigation */}
        {isLanding && (
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.nav.features}
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.nav.pricing}
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.nav.faq}
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <span className="hidden md:inline">{user.name.split(" ")[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-primary font-medium capitalize">{user.plan} {t.nav.plan}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{user.credits} {t.nav.credits}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {t.nav.dashboard}
                  </Link>
                </DropdownMenuItem>
                {user.plan === "free" && (
                  <DropdownMenuItem asChild>
                    <Link href="/upgrade" className="cursor-pointer text-chart-2">
                      <Crown className="mr-2 h-4 w-4" />
                      {t.nav.upgradeToPro}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.nav.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  {t.nav.signIn}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  {t.nav.getStarted}
                </Button>
              </Link>
            </>
          )}

          {/* Mobile menu for landing page */}
          {isLanding && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile navigation for landing page */}
      {mobileMenuOpen && isLanding && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="#features"
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-card"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.features}
            </Link>
            <Link
              href="#pricing"
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-card"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="#faq"
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-card"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.faq}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
