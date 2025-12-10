"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-2xl px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h1 className="text-4xl font-bold">Nous Contacter</h1>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Des questions ? Nous aimerions vous entendre.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <Input
                    type="text"
                    placeholder="Votre nom"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Objet</label>
                  <Input
                    type="text"
                    placeholder="Sujet de votre message"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    placeholder="Votre message..."
                    required
                    className="w-full min-h-32"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer le message
                </Button>

                {submitted && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-center">
                    Merci ! Nous avons reçu votre message et vous recontacterons bientôt.
                  </div>
                )}
              </form>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">support@vidinsight.ai</p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Support</h3>
                <p className="text-muted-foreground">Disponible 24h/24, 7j/7</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}
