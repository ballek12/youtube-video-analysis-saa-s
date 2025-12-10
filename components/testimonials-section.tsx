"use client"

import { Quote, Star } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"
import { useEffect, useRef, useState } from "react"

export function TestimonialsSection() {
  const { t } = useI18n()
  const testimonials = t.testimonials.items.map((item) => ({ ...item, rating: 5 }))
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(isPaused)

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 1.5
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth

    const scroll = () => {
      if (!isPausedRef.current) {
        scrollAmount += scrollSpeed
        if (scrollAmount > maxScroll) {
          scrollAmount = 0
        }
        scrollContainer.scrollLeft = scrollAmount
      }
    }

    const interval = setInterval(scroll, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-card/20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection animation="fade-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.testimonials.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.testimonials.subtitle}</p>
          </div>
        </AnimatedSection>

        <div
          ref={scrollContainerRef}
          className="mt-16 flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-96 rounded-2xl border border-border/40 bg-card/30 p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-chart-3 text-chart-3" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-primary/40" />
              <p className="mt-4 text-muted-foreground leading-relaxed flex-1">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/40 to-chart-2/40 flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
