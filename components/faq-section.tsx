"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"

export function FaqSection() {
  const { t } = useI18n()
  const faqs = t.faq.items
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <AnimatedSection animation="fade-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.faq.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.faq.subtitle}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/40">
                <AccordionTrigger className="text-left hover:text-primary">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}
