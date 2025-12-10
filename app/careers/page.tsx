"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { Briefcase } from "lucide-react"

export default function CareersPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Carrières</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Rejoignez l'équipe VidInsight
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Nous Rejoindre</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                VidInsight est en croissance rapide et nous cherchons des talents passionnés 
                pour rejoindre notre équipe. Si vous partagez notre vision de transformer 
                l'analyse vidéo avec l'IA, nous aimerions vous entendre.
              </p>
              <p className="text-muted-foreground">
                Envoyez votre CV et lettre de motivation à: <strong>careers@vidinsight.ai</strong>
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="space-y-6">
              {[
                {
                  title: "Ingénieur Full Stack",
                  level: "Senior",
                  description: "Rejoignez notre équipe pour développer les features de VidInsight"
                },
                {
                  title: "Ingénieur Machine Learning",
                  level: "Senior",
                  description: "Travaillez sur nos modèles IA pour améliorer la précision des analyses"
                },
                {
                  title: "Designer UX/UI",
                  level: "Mid",
                  description: "Créez des interfaces intuitives pour notre plateforme"
                },
                {
                  title: "Responsable Marketing",
                  level: "Mid",
                  description: "Aidez-nous à atteindre les créateurs du monde entier"
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/40 bg-card/30 p-6 hover:bg-card/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
                      {job.level}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}
