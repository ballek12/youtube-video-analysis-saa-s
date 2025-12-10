"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { Cookie } from "lucide-react"

export default function CookiePolicyPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Cookie className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Politique des Cookies</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Comment nous utilisons les cookies
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Qu'est-ce qu'un Cookie ?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Un cookie est un petit fichier stocké sur votre appareil qui contient des informations 
                  sur votre visite à notre site. Les cookies nous aident à vous offrir une meilleure expérience.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Types de Cookies que Nous Utilisons</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Cookies Essentiels</h3>
                    <p className="text-muted-foreground text-sm">
                      Nécessaires pour le fonctionnement du site et sécuriser votre compte.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Cookies de Performance</h3>
                    <p className="text-muted-foreground text-sm">
                      Nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Cookies de Marketing</h3>
                    <p className="text-muted-foreground text-sm">
                      Utilisés pour vous montrer des publicités pertinentes et mesurer l'efficacité des campagnes.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contrôle des Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vous pouvez contrôler les cookies via les paramètres de votre navigateur. 
                  Cependant, désactiver certains cookies peut affecter le fonctionnement du site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Cookies Tiers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous utilisons également des cookies de tiers pour l'analyse (Google Analytics) 
                  et les publicités. Ces tiers ont leurs propres politiques de confidentialité.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Consentement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En continuant à utiliser notre site, vous consentez à notre utilisation des cookies. 
                  Pour retirer votre consentement, veuillez modifier les paramètres de votre navigateur.
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
