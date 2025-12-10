"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, Download, Receipt, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import Link from "next/link"
import { toast } from "sonner"

interface Invoice {
  id: string
  date: string
  amount: number
  plan: string
  status: "paid" | "pending" | "failed"
}

export default function BillingPage() {
  const { user } = useAuth()
  const { t } = useI18n()

  // Mock invoices - in production, fetch from API
  const invoices: Invoice[] = [
    {
      id: "INV-2025-001",
      date: "2025-01-15",
      amount: 19,
      plan: "Pro",
      status: "paid",
    },
    {
      id: "INV-2024-012",
      date: "2024-12-15",
      amount: 19,
      plan: "Pro",
      status: "paid",
    },
  ]

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{t.nav.billing}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {t.sidebar.history}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Current Plan */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Plan actuel
              </CardTitle>
              <CardDescription>Votre abonnement actuel et ses détails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                <div>
                  <h3 className="font-semibold capitalize">{user.plan}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.plan === "free" ? "Gratuit" : user.plan === "pro" ? "$19/mois" : "$99/mois"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{user.credits} {t.nav.credits}</p>
                  <p className="text-xs text-muted-foreground">restants</p>
                </div>
              </div>

              {user.plan === "free" ? (
                <Link href="/upgrade">
                  <Button className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t.sidebar.upgradeToPro}
                  </Button>
                </Link>
              ) : (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Modifier le plan
                  </Button>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                    Annuler l'abonnement
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Méthode de paiement</CardTitle>
              <CardDescription>Gérez vos informations de paiement</CardDescription>
            </CardHeader>
            <CardContent>
              {user.plan === "free" ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Aucune méthode de paiement requise pour le plan gratuit
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expire 12/25</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Modifier
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Invoices */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Factures
            </CardTitle>
            <CardDescription>Historique de vos factures et paiements</CardDescription>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                Aucune facture pour le moment
              </div>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Receipt className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(invoice.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="text-right">
                        <p className="font-semibold">${invoice.amount}</p>
                        <p className="text-xs text-muted-foreground capitalize">{invoice.plan}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === "paid"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : invoice.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {invoice.status === "paid" ? "Payé" : invoice.status === "pending" ? "En attente" : "Échoué"}
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

