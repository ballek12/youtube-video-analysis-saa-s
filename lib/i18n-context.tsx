"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Language, translations, type TranslationKey } from "./i18n"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKey
}

const I18nContext = createContext<I18nContextType>({
  language: "fr",
  setLanguage: () => {},
  t: translations.fr,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const stored = localStorage.getItem("vidinsight_language") as Language | null
    if (stored && (stored === "fr" || stored === "en" || stored === "es" || stored === "de")) {
      setLanguageState(stored)
      document.documentElement.setAttribute("lang", stored)
    } else {
      document.documentElement.setAttribute("lang", "fr")
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("vidinsight_language", newLanguage)
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", newLanguage)
    }
  }

  const t = translations[language]

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  return context
}
