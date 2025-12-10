"use client"

import type { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur"
  delay?: number
}

export function AnimatedSection({ children, className, animation = "fade-up", delay = 0 }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const animationClasses = {
    "fade-up": "translate-y-10 opacity-0",
    "fade-down": "-translate-y-10 opacity-0",
    "fade-left": "translate-x-10 opacity-0",
    "fade-right": "-translate-x-10 opacity-0",
    scale: "scale-95 opacity-0",
    blur: "blur-sm opacity-0",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 translate-x-0 scale-100 opacity-100 blur-0" : animationClasses[animation],
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
