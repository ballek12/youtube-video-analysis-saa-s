"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Play, BarChart3, Brain, Target, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Welcome to VidInsight",
    description: "Let's get you set up in just a few steps",
    icon: Sparkles,
  },
  {
    title: "What's your goal?",
    description: "Help us personalize your experience",
    icon: Target,
  },
  {
    title: "You're all set!",
    description: "Start analyzing your first video",
    icon: Check,
  },
]

const goals = [
  { id: "creator", label: "Content Creator", description: "Optimize my own YouTube videos" },
  { id: "marketer", label: "Marketer", description: "Analyze competitor content" },
  { id: "researcher", label: "Researcher", description: "Study video trends & patterns" },
  { id: "agency", label: "Agency", description: "Manage multiple client channels" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const canProceed = currentStep === 0 || (currentStep === 1 && selectedGoal) || currentStep === 2

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-16 rounded-full transition-colors",
                index <= currentStep ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
            {(() => {
              const Icon = steps[currentStep].icon
              return <Icon className="h-8 w-8 text-primary" />
            })()}
          </div>

          <h1 className="text-3xl font-bold">
            {currentStep === 0 && user ? `Hey ${user.name.split(" ")[0]}!` : steps[currentStep].title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{steps[currentStep].description}</p>
        </div>

        {/* Step Content */}
        <div className="mt-12">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border/40 bg-card/30 p-6 text-center">
                <Play className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold">Paste a Link</h3>
                <p className="mt-2 text-sm text-muted-foreground">Simply paste any YouTube URL to start</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-card/30 p-6 text-center">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold">Get Metrics</h3>
                <p className="mt-2 text-sm text-muted-foreground">View engagement stats and virality scores</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-card/30 p-6 text-center">
                <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold">AI Insights</h3>
                <p className="mt-2 text-sm text-muted-foreground">Get smart recommendations to improve</p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    "rounded-xl border p-6 text-left transition-all",
                    selectedGoal === goal.id
                      ? "border-primary bg-primary/10"
                      : "border-border/40 bg-card/30 hover:border-border",
                  )}
                >
                  <h3 className="font-semibold">{goal.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{goal.description}</p>
                </button>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="rounded-xl border border-primary/40 bg-primary/10 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Your account is ready!</h3>
              <p className="mt-2 text-muted-foreground">
                You have <span className="text-primary font-semibold">{user?.credits || 5} free credits</span> to start
                analyzing videos.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className="h-12 px-8 bg-primary hover:bg-primary/90"
          >
            {currentStep === steps.length - 1 ? "Go to Dashboard" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Go back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
