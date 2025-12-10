"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function HelpCenterPage() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Centre d'Aide</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Trouvez les réponses à vos questions
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="mb-12">
              <Input
                type="text"
                placeholder="Rechercher une réponse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="space-y-6">
              {[
                {
                  category: "Compte",
                  items: [
                    "Comment créer un compte ?",
                    "Comment réinitialiser mon mot de passe ?",
                    "Comment supprimer mon compte ?",
                  ]
                },
                {
                  category: "Analyse",
                  items: [
                    "Pourquoi ma vidéo ne peut pas être analysée ?",
                    "Combien de temps dure une analyse ?",
                    "Puis-je analyser une vidéo privée ?",
                  ]
                },
                {
                  category: "Facturation",
                  items: [
                    "Comment puis-je mettre à niveau mon plan ?",
                    "Puis-je changer mon plan à tout moment ?",
                    "Que se passe-t-il après l'essai gratuit ?",
                  ]
                },
              ].map((category, catIndex) => (
                <div key={catIndex}>
                  <h3 className="text-lg font-bold mb-4">{category.category}</h3>
                  <div className="space-y-3 mb-8">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="rounded-lg border border-border/40 bg-card/30 p-4 hover:bg-card/50 transition-colors cursor-pointer"
                      >
                        <p className="text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
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
