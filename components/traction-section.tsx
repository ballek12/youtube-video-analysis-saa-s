"use client"

import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"

const logos = [
  { name: "TechCrunch", opacity: "opacity-60" },
  { name: "Forbes", opacity: "opacity-60" },
  { name: "Product Hunt", opacity: "opacity-60" },
  { name: "Hacker News", opacity: "opacity-60" },
  { name: "The Verge", opacity: "opacity-60" },
]

export function TractionSection() {
  const { t } = useI18n()
  return (
    <section className="py-12 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection animation="fade-up">
          <p className="text-center text-sm text-muted-foreground mb-8">
            {t.traction.trustedBy}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {logos.map((logo) => (
              <div
                key={`logo-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-xl font-bold text-foreground ${logo.opacity} hover:opacity-100 transition-opacity`}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
