"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedCounterProps {
  value: string
  duration?: number
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>()
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isVisible) return

    const numericMatch = value.match(/^([\d.]+)/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const numericValue = Number.parseFloat(numericMatch[1])
    const suffix = value.replace(numericMatch[1], "")
    const isDecimal = value.includes(".")
    const decimalPlaces = isDecimal ? numericMatch[1].split(".")[1]?.length || 1 : 0

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = numericValue * easeOut

      if (isDecimal) {
        setDisplayValue(current.toFixed(decimalPlaces) + suffix)
      } else {
        setDisplayValue(Math.floor(current).toLocaleString() + suffix)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return <span ref={ref}>{displayValue}</span>
}
