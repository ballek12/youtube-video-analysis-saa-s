"use client"

import { FileText, BarChart3, TrendingUp, Brain, ImageIcon, Zap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"

export function FeaturesSection() {
  const { t } = useI18n()

  const features = [
    {
      icon: FileText,
      title: t.features.items.transcription.title,
      description: t.features.items.transcription.description,
    },
    {
      icon: BarChart3,
      title: t.features.items.metrics.title,
      description: t.features.items.metrics.description,
    },
    {
      icon: TrendingUp,
      title: t.features.items.virality.title,
      description: t.features.items.virality.description,
    },
    {
      icon: Brain,
      title: t.features.items.scriptGenerator.title,
      description: t.features.items.scriptGenerator.description,
    },
    {
      icon: ImageIcon,
      title: t.features.items.thumbnailGenerator.title,
      description: t.features.items.thumbnailGenerator.description,
    },
    {
      icon: Zap,
      title: t.features.items.realTime.title,
      description: t.features.items.realTime.description,
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection animation="fade-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.features.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="group rounded-2xl border border-border/40 bg-card/30 p-6 transition-all hover:border-primary/40 hover:bg-card/60 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
