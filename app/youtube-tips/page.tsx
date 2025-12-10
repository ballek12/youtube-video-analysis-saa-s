"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { TrendingUp } from "lucide-react"

export default function YoutubeTipsPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Conseils YouTube</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Conseils et stratégies pour augmenter votre engagement
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="space-y-6">
              {[
                {
                  title: "Optimiser Votre Titre",
                  description: "Les titres sont cruciaux pour le CTR. Utilisez des mots-clés pertinents et soyez intéressant."
                },
                {
                  title: "Créer une Bonne Miniature",
                  description: "Une miniature attrayante peut augmenter votre CTR de 30%. Utilisez des couleurs contrastées et du texte lisible."
                },
                {
                  title: "Durée Optimale de Vidéo",
                  description: "Les vidéos de 8-12 minutes tendent à avoir un meilleur engagement. Adaptez à votre audience."
                },
                {
                  title: "Utiliser des Hashtags",
                  description: "Ajoutez 3-5 hashtags pertinents pour améliorer la découvrabilité de votre vidéo."
                },
                {
                  title: "Engager dans les Commentaires",
                  description: "Répondez aux commentaires rapidement. Cela boost l'algorithme et construit votre communauté."
                },
                {
                  title: "Créer une Série",
                  description: "Les séries de vidéos créent une habitude chez vos viewers et augmentent votre rétention."
                },
              ].map((tip, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/40 bg-card/30 p-6"
                >
                  <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.description}</p>
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
