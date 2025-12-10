"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { Package } from "lucide-react"

export default function ResourcesPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Package className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Ressources</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Outils et ressources pour les créateurs
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Template de Miniature",
                  description: "Téléchargez nos templates Photoshop gratuits pour créer des miniatures professionnelles"
                },
                {
                  title: "Guide du Contenu Viral",
                  description: "Un guide complet sur les éléments qui rendent un contenu viral sur YouTube"
                },
                {
                  title: "Checklist de Vidéo",
                  description: "La checklist complète avant de publier votre vidéo"
                },
                {
                  title: "Tendances Actuelles",
                  description: "Découvrez les tendances vidéo et formats les plus populaires"
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/40 bg-card/30 p-6 hover:bg-card/50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm">{resource.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8">
              <h2 className="text-2xl font-bold mb-4">Articles Utiles</h2>
              <div className="space-y-4">
                {[
                  "Comment augmenter votre taux de retention",
                  "L'importance du CTR et comment l'améliorer",
                  "Stratégies de croissance pour les nouvelles chaînes",
                  "Monétiser votre chaîne YouTube",
                  "Optimiser vos tags et descriptions",
                ].map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors cursor-pointer"
                  >
                    <span className="text-primary">→</span>
                    <p className="text-foreground">{article}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}
