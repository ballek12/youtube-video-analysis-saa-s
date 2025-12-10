"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, ArrowLeft, Eye, EyeOff, Loader2, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { toast } from "sonner"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plan") || "free"
  const { t } = useI18n()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error(t.signup.fillFields)
      return
    }

    if (password.length < 8) {
      toast.error(t.signup.passwordLength)
      return
    }

    if (!acceptTerms) {
      toast.error(t.signup.acceptTermsError)
      return
    }

    setIsLoading(true)
    const success = await signup(email, password, name)
    setIsLoading(false)

    if (success) {
      toast.success(t.signup.accountCreated)
      router.push("/onboarding")
    } else {
      toast.error(t.signup.accountExists)
    }
  }

  const passwordStrength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3

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
            {t.signup.backToHome}
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">VidInsight</span>
          </div>

          <h1 className="text-2xl font-bold">{t.signup.title}</h1>
          <p className="mt-2 text-muted-foreground">{t.signup.subtitle}</p>

          {selectedPlan !== "free" && (
            <div className="mt-4 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3">
              <p className="text-sm">
                {t.signup.selectedPlan}: <span className="font-semibold text-primary capitalize">{selectedPlan}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">{t.signup.fullName}</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 bg-card border-border/60"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.signup.email}</Label>
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
              <Label htmlFor="password">{t.signup.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.signup.createPassword}
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
              {password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        passwordStrength >= level
                          ? level === 1
                            ? "bg-destructive"
                            : level === 2
                              ? "bg-chart-3"
                              : "bg-chart-2"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                {t.signup.acceptTerms}{" "}
                <Link href="#" className="text-primary hover:underline">
                  {t.signup.termsOfService}
                </Link>{" "}
                {t.signup.and}{" "}
                <Link href="#" className="text-primary hover:underline">
                  {t.signup.privacyPolicy}
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.signup.creatingAccount}
                </>
              ) : (
                t.signup.createAccount
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.signup.alreadyHaveAccount}{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              {t.signup.signIn}
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-card/30 border-l border-border/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="relative px-12">
          <h2 className="text-3xl font-bold">{t.signup.startForFree}</h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            {t.signup.startForFreeDesc}
          </p>

          <ul className="mt-8 space-y-4">
            {[
              t.signup.features.transcription,
              t.signup.features.metrics,
              t.signup.features.virality,
              t.signup.features.recommendations,
              t.signup.features.export,
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
