"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { Lock } from "lucide-react"

export default function PrivacyPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lock className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Politique de Confidentialité</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Nous prenons votre vie privée au sérieux
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Collecte de Données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VidInsight collecte les informations que vous fournissez directement, 
                  ainsi que des données d'utilisation pour améliorer nos services. 
                  Cela inclut votre nom, adresse email, et les vidéos que vous analysez.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Utilisation des Données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vos données sont utilisées pour:
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-2">
                  <li>Fournir et maintenir nos services</li>
                  <li>Améliorer votre expérience utilisateur</li>
                  <li>Vous envoyer des mises à jour et des offres promotionnelles</li>
                  <li>Respecter les obligations légales</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Sécurité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous utilisons des mesures de sécurité standard pour protéger vos données 
                  contre l'accès non autorisé, l'altération, la divulgation ou la destruction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Vos Droits</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vous avez le droit d'accéder, corriger ou supprimer vos données personnelles. 
                  Pour exercer ces droits, contactez-nous à privacy@vidinsight.ai
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site utilise des cookies pour améliorer votre expérience. 
                  Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur.
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
