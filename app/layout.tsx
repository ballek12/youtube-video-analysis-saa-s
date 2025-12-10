import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-context"
import { I18nProvider } from "@/lib/i18n-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VidInsight AI - Analyse de vidéos YouTube avec IA",
  description:
    "Analysez n'importe quelle vidéo YouTube avec l'IA. Obtenez des transcriptions, des métriques d'engagement, des scores de viralité et des insights exploitables en quelques secondes.",
  keywords: ["analyse YouTube", "analytique vidéo", "transcription IA", "score de viralité", "métriques d'engagement"],
  openGraph: {
    title: "VidInsight AI - Analyse de vidéos YouTube",
    description: "Plateforme d'analyse de vidéos YouTube alimentée par l'IA",
    type: "website",
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <I18nProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
