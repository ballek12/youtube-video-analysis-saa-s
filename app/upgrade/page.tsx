"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Check, Sparkles, Crown, Zap, Building2, CreditCard, Shield, Clock, ArrowRight } from "lucide-react"

export default function UpgradePage() {
  const { user, updateUser } = useAuth()
  const { t } = useI18n()
  const [isYearly, setIsYearly] = useState(false)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  const plans = [
    {
      id: "free",
      name: t.upgrade.plans.free.name,
      icon: Zap,
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: t.upgrade.plans.free.description,
      credits: 5,
      features: t.upgrade.plans.free.features,
      limitations: t.upgrade.plans.free.limitations,
    },
    {
      id: "pro",
      name: t.upgrade.plans.pro.name,
      icon: Crown,
      monthlyPrice: 19,
      yearlyPrice: 190,
      description: t.upgrade.plans.pro.description,
      credits: 100,
      popular: true,
      features: t.upgrade.plans.pro.features,
      limitations: t.upgrade.plans.pro.limitations,
    },
    {
      id: "enterprise",
      name: t.upgrade.plans.enterprise.name,
      icon: Building2,
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: t.upgrade.plans.enterprise.description,
      credits: -1, // Unlimited
      features: t.upgrade.plans.enterprise.features,
      limitations: t.upgrade.plans.enterprise.limitations,
    },
  ]

  const handleUpgrade = async (planId: string) => {
    if (planId === user?.plan) {
      toast.info(t.upgrade.alreadyOnPlan)
      return
    }

    setIsProcessing(planId)

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000))

    const plan = plans.find((p) => p.id === planId)
    if (plan) {
      updateUser({
        plan: planId as "free" | "pro" | "enterprise",
        credits: plan.credits === -1 ? 9999 : plan.credits,
      })
      toast.success(`${t.upgrade.upgradeSuccess} ${plan.name}!`)
    }

    setIsProcessing(null)
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            {t.upgrade.badge}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{t.upgrade.title}</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t.upgrade.subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={cn("text-sm", !isYearly && "text-foreground font-medium")}>{t.upgrade.monthly}</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={cn("text-sm", isYearly && "text-foreground font-medium")}>
              {t.upgrade.yearly}
              <span className="ml-1.5 text-xs text-chart-2 font-medium">{t.upgrade.savePercent}</span>
            </span>
          </div>
        </div>

        {/* Current Plan Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2 rounded-full bg-card border border-border/60 px-4 py-2 text-sm">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>{t.upgrade.currentPlan}:</span>
            <span className="font-semibold capitalize">{user?.plan}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary font-medium">{user?.credits} {t.upgrade.credits}</span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => {
            const isCurrentPlan = user?.plan === plan.id
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
            const Icon = plan.icon

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border p-6 transition-all flex flex-col",
                  plan.popular
                    ? "border-primary bg-card shadow-lg shadow-primary/10 scale-[1.02]"
                    : "border-border/40 bg-card/30 hover:border-border/60",
                  isCurrentPlan && "ring-2 ring-primary/50",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      {t.upgrade.mostPopular}
                    </div>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <div className="flex items-center gap-1 rounded-full bg-chart-2 px-3 py-1 text-xs font-medium text-white">
                      {t.upgrade.currentPlanBadge}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      plan.popular ? "bg-primary/20" : "bg-card border border-border/60",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", plan.popular ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${price}</span>
                  <span className="text-muted-foreground">/{isYearly ? t.upgrade.perYear : t.upgrade.perMonth}</span>
                  {plan.credits > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">{plan.credits} {t.upgrade.creditsPerMonth}</p>
                  )}
                  {plan.credits === -1 && <p className="text-sm text-chart-2 mt-1 font-medium">{t.upgrade.unlimitedCredits}</p>}
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-chart-2 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex items-start gap-2.5 text-sm opacity-50">
                      <span className="h-4 w-4 mt-0.5 shrink-0 text-center">—</span>
                      <span className="text-muted-foreground line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrentPlan || isProcessing !== null}
                  className={cn(
                    "w-full",
                    plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80",
                  )}
                >
                  {isProcessing === plan.id ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {t.upgrade.processing}
                    </span>
                  ) : isCurrentPlan ? (
                    t.upgrade.currentPlanBadge
                  ) : plan.id === "free" ? (
                    t.upgrade.downgrade
                  ) : (
                    <>
                      {t.upgrade.upgradeTo} {plan.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-chart-2" />
            {t.upgrade.securePayments}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-chart-2" />
            {t.upgrade.moneyBack}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-chart-2" />
            {t.upgrade.instantActivation}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-6">{t.upgrade.faqTitle}</h2>
          <div className="space-y-4">
            {t.upgrade.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border/40 bg-card/30 p-5">
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
