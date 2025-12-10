"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { FileText } from "lucide-react"

export default function TermsPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Conditions d'Utilisation</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Veuillez lire attentivement ces conditions
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Acceptation des Conditions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En utilisant VidInsight, vous acceptez ces conditions d'utilisation. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. Utilisation du Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vous vous engagez à utiliser VidInsight uniquement à des fins légales et 
                  en conformité avec tous les lois et réglementations applicables.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Compte Utilisateur</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vous êtes responsable de maintenir la confidentialité de vos identifiants 
                  de connexion et de toutes les activités effectuées sous votre compte.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Propriété Intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tous les contenus fournis par VidInsight, y compris les analyses, 
                  sont protégés par les lois sur la propriété intellectuelle.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. Limitation de Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VidInsight n'est pas responsable des dommages indirects, incidentiels, 
                  spéciaux ou consécutifs résultant de votre utilisation du service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Résiliation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VidInsight peut résilier ou suspendre votre accès à tout moment 
                  en cas de violation de ces conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VidInsight se réserve le droit de modifier ces conditions à tout moment. 
                  Les modifications entreront en vigueur immédiatement après leur publication.
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
