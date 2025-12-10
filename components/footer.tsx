"use client"

import Link from "next/link"
import { Sparkles, Twitter, Github, Linkedin, Youtube } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useI18n } from "@/lib/i18n-context"

export function Footer() {
  const { t } = useI18n()

  const footerLinks = {
    product: [
      { name: t.footer.links.features, href: "#features" },
      { name: t.footer.links.pricing, href: "#pricing" },
      { name: t.footer.links.thumbnailGenerator, href: "/tools/thumbnail" },
      { name: t.footer.links.scriptGenerator, href: "/tools/script" },
    ],
    company: [
      { name: t.footer.links.about, href: "/about" },
      { name: t.footer.links.contact, href: "/contact" },
      { name: t.footer.links.careers, href: "/careers" },
    ],
    resources: [
      { name: t.footer.links.documentation, href: "/documentation" },
      { name: t.footer.links.helpCenter, href: "/help-center" },
      { name: t.footer.links.youtubeTips, href: "/youtube-tips" },
    ],
    legal: [
      { name: t.footer.links.about, href: "/legal" },
      { name: t.footer.links.privacy, href: "/privacy" },
      { name: t.footer.links.terms, href: "/terms" },
      { name: t.footer.links.cookiePolicy, href: "/cookie-policy" },
    ],
  }
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <AnimatedSection animation="fade-up">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">VidInsight</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {t.footer.description}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold">{t.footer.product}</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">{t.footer.company}</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">{t.footer.resources}</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">{t.footer.legal}</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
          <p className="text-sm text-muted-foreground">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
