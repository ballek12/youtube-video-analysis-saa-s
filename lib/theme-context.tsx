"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    const stored = localStorage.getItem("vidinsight_theme") as Theme | null
    if (stored) {
      setThemeState(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
      document.documentElement.classList.toggle("light", stored === "light")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("vidinsight_theme", newTheme)
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context
}
