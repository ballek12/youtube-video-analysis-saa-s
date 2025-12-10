"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { BookOpen } from "lucide-react"

export default function DocumentationPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Documentation</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Apprenez à utiliser VidInsight avec nos guides complets
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="space-y-6">
              {[
                {
                  title: "Commencer",
                  description: "Guide d'introduction pour débuter avec VidInsight"
                },
                {
                  title: "Analyse de Vidéo",
                  description: "Comment analyser une vidéo YouTube et interpréter les résultats"
                },
                {
                  title: "Générateur de Miniatures",
                  description: "Créez des miniatures professionnelles avec notre IA"
                },
                {
                  title: "Générateur de Scripts",
                  description: "Générez des scripts viraux optimisés pour l'engagement"
                },
                {
                  title: "API",
                  description: "Documentation complète pour intégrer VidInsight dans votre application"
                },
                {
                  title: "FAQ",
                  description: "Réponses aux questions fréquemment posées"
                },
              ].map((doc, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/40 bg-card/30 p-6 hover:bg-card/50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-bold mb-2">{doc.title}</h3>
                  <p className="text-muted-foreground">{doc.description}</p>
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
