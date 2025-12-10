"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { Sparkles } from "lucide-react"

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">À propos de VidInsight</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Comprendre et optimiser votre contenu YouTube avec l'IA
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                VidInsight est une plateforme IA révolutionnaire conçue pour les créateurs de contenu YouTube. 
                Notre mission est de démocratiser l'accès aux outils d'analyse vidéo sophistiqués, en permettant 
                à chaque créateur de comprendre et d'optimiser son contenu pour un engagement maximal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nous croyons que les données et les insights IA peuvent aider les créateurs à prendre de meilleures 
                décisions, à créer un contenu plus pertinent et à développer leur audience plus rapidement.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8">
              <h2 className="text-2xl font-bold mb-4">Nos Fonctionnalités Clés</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    <strong>Transcription IA</strong> - Obtenez des transcriptions précises et instantanées de vos vidéos
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    <strong>Analyse de Viralité</strong> - Prédictez le potentiel de viralité de votre contenu
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    <strong>Générateur de Miniatures</strong> - Créez des miniatures attrayantes avec l'IA
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    <strong>Générateur de Scripts</strong> - Générez des scripts viraux en quelques secondes
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}
