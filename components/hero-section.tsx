"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BarChart3, FileText, Sparkles, Play, ImageIcon, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { AnimatedSection } from "@/components/animated-section"

export function HeroSection() {
  const router = useRouter()
  const { user } = useAuth()
  const { t } = useI18n()

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/signup")
    }
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <AnimatedSection animation="fade-down" delay={0}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
              <span className="text-muted-foreground">{t.hero.badge}</span>
            </div>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
              <span className="text-balance">{t.hero.title} </span>
              <span className="gradient-text">{t.hero.titleHighlight}</span>
            </h1>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-balance leading-relaxed">
              {t.hero.subtitle}
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium animate-glow"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {user ? t.hero.goToDashboard : t.hero.startTrial}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 border-border/60 hover:bg-secondary/50 bg-transparent"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="mr-2 h-4 w-4" />
                {t.hero.watchDemo}
              </Button>
            </div>
          </AnimatedSection>

          {/* Trust badges */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
                <span>{t.hero.noCreditCard}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
                <span>{t.hero.freeAnalyses}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
                <span>{t.hero.cancelAnytime}</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Feature pills */}
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <FeaturePill icon={FileText} label={t.hero.features.transcription} />
              <FeaturePill icon={BarChart3} label={t.hero.features.metrics} />
              <FeaturePill icon={Zap} label={t.hero.features.virality} />
              <FeaturePill icon={ImageIcon} label={t.hero.features.thumbnail} />
            </div>
          </AnimatedSection>
        </div>

        {/* Preview Card */}
        <AnimatedSection animation="scale" delay={600}>
          <div className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5 animated-border">
              <div className="border-b border-border/60 bg-secondary/30 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-chart-3/60" />
                  <div className="h-3 w-3 rounded-full bg-chart-2/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground font-mono">vidinsight.ai/dashboard</span>
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricPreviewCard label={t.hero.preview.viralityScore} value="87%" trend="+12%" color="text-chart-2" />
                <MetricPreviewCard label={t.hero.preview.engagementRate} value="4.2%" trend="+0.8%" color="text-chart-3" />
                <MetricPreviewCard label={t.hero.preview.sentiment} value={t.hero.preview.positive} trend="92%" color="text-primary" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function FeaturePill({ icon: Icon, label }: { icon: typeof FileText; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/30 px-4 py-2 text-sm">
      <Icon className="h-4 w-4 text-primary" />
      <span>{label}</span>
    </div>
  )
}

function MetricPreviewCard({
  label,
  value,
  trend,
  color,
}: {
  label: string
  value: string
  trend: string
  color: string
}) {
  const [animationDelay, setAnimationDelay] = useState<string>("0s")

  useEffect(() => {
    // Générer le délai uniquement côté client pour éviter les erreurs d'hydratation
    setAnimationDelay(`${Math.random() * 1}s`)
  }, [])

  return (
    <div
      className="rounded-xl border border-border/40 bg-background/50 p-5 animate-float"
      style={{ animationDelay }}
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-chart-2">{trend}</p>
    </div>
  )
}
