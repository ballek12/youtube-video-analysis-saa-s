"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error(t.login.fillFields)
      return
    }

    setIsLoading(true)
    const success = await login(email, password)
    setIsLoading(false)

    if (success) {
      toast.success(t.login.welcomeBack)
      router.push("/dashboard")
    } else {
      toast.error(t.login.invalidCredentials)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.login.backToHome}
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">VidInsight</span>
          </div>

          <h1 className="text-2xl font-bold">{t.login.title}</h1>
          <p className="mt-2 text-muted-foreground">{t.login.subtitle}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t.login.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-card border-border/60"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.login.password}</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  {t.login.forgotPassword}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.login.enterPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-card border-border/60 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.login.signingIn}
                </>
              ) : (
                t.login.signIn
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.login.noAccount}{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              {t.login.signUp}
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-card/30 border-l border-border/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="relative text-center px-12">
          <h2 className="text-3xl font-bold">{t.login.analyzeAnyVideo}</h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            {t.login.analyzeAnyVideoDesc}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border/40 bg-card/50 p-4 text-center">
              <p className="text-2xl font-bold text-primary">10M+</p>
              <p className="text-xs text-muted-foreground">{t.login.videosAnalyzed}</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card/50 p-4 text-center">
              <p className="text-2xl font-bold text-primary">95%</p>
              <p className="text-xs text-muted-foreground">{t.login.accuracyRate}</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card/50 p-4 text-center">
              <p className="text-2xl font-bold text-primary">50K+</p>
              <p className="text-xs text-muted-foreground">{t.login.happyUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
