"use client"

import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCounter } from "@/components/animated-counter"
import { useI18n } from "@/lib/i18n-context"

export function StatsSection() {
  const { t } = useI18n()

  const stats = [
    { value: "10M+", label: t.stats.videosAnalyzed },
    { value: "98%", label: t.stats.accuracyRate },
    { value: "30", label: t.stats.secondAnalysis },
    { value: "50+", label: t.stats.languagesSupported },
  ]

  return (
    <section className="border-y border-border/40 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="text-center">
                <p className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
