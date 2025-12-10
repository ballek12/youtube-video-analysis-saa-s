"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"

export function PricingSection() {
  const { t } = useI18n()

  const plans = [
    {
      name: t.pricing.plans.free.name,
      price: "0",
      description: t.pricing.plans.free.description,
      features: t.pricing.plans.free.features,
      cta: t.pricing.getStartedFree,
      href: "/signup",
      popular: false,
    },
    {
      name: t.pricing.plans.pro.name,
      price: "19",
      description: t.pricing.plans.pro.description,
      features: t.pricing.plans.pro.features,
      cta: t.pricing.startProTrial,
      href: "/signup?plan=pro",
      popular: true,
    },
    {
      name: t.pricing.plans.enterprise.name,
      price: "99",
      description: t.pricing.plans.enterprise.description,
      features: t.pricing.plans.enterprise.features,
      cta: t.pricing.contactSales,
      href: "/signup?plan=enterprise",
      popular: false,
    },
  ]
  return (
    <section id="pricing" className="py-24 bg-card/20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection animation="fade-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.pricing.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} animation="fade-up" delay={index * 150}>
              <div
                className={cn(
                  "relative rounded-2xl border p-8 transition-all h-full flex flex-col",
                  plan.popular
                    ? "border-primary bg-card shadow-lg shadow-primary/10"
                    : "border-border/40 bg-card/30 hover:border-border/60",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      {t.pricing.mostPopular}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mt-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">{t.pricing.perMonth}</span>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} className="mt-8 block">
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80",
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
