"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"

export function CtaSection() {
  const { t } = useI18n()
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <AnimatedSection animation="scale">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent p-12 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px] opacity-40 animate-pulse-ring" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 animate-float">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.cta.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                {t.cta.subtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8 animate-glow">
                    {t.cta.startFreeTrial}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                    {t.cta.viewPricing}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
