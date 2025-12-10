"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { Scale } from "lucide-react"

export default function LegalPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Informations Légales</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Conditions légales et mentions obligatoires
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Éditeur du Site</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VidInsight SAS<br />
                  [Adresse complète]<br />
                  SIRET: [Numéro SIRET]<br />
                  Email: contact@vidinsight.ai
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Directeur de Publication</h2>
                <p className="text-muted-foreground">
                  [Nom du Directeur]
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Hébergement</h2>
                <p className="text-muted-foreground">
                  Ce site est hébergé par [Nom de l'hébergeur]<br />
                  [Adresse de l'hébergeur]
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Propriété Intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tous les éléments de ce site, incluant les textes, images, logos et codes source, 
                  sont la propriété exclusive de VidInsight ou sont utilisés avec permission. 
                  Toute reproduction sans autorisation est interdite.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Limitation de Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VidInsight décline toute responsabilité pour les dommages directs ou indirects 
                  résultant de l'utilisation de ce site ou des services fournis.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}
