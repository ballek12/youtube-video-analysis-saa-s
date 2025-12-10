"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Globe, Moon, Shield, Trash2, Download, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { useI18n } from "@/lib/i18n-context"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useI18n()
  const router = useRouter()

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  const handleExportData = () => {
    toast.success(t.settings.privacy.exportSuccess)
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      await router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to logout")
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await logout()
      toast.success(t.settings.danger.deleteSuccess)
      await router.push("/")
    } catch (error) {
      console.error("Delete account error:", error)
      toast.error("Failed to delete account")
    }
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">{t.settings.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.settings.subtitle}</p>

        <div className="mt-8 space-y-6">
          {/* Appearance */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Moon className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how VidInsight looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                </div>
                <Select value={theme} onValueChange={(value: "dark" | "light") => setTheme(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t.settings.language.title}
              </CardTitle>
              <CardDescription>{t.settings.language.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.settings.language.language}</Label>
                  <p className="text-sm text-muted-foreground">{t.settings.language.languageDescription}</p>
                </div>
                <Select value={language} onValueChange={(value: "fr" | "en" | "es" | "de") => setLanguage(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">{t.settings.language.french}</SelectItem>
                    <SelectItem value="en">{t.settings.language.english}</SelectItem>
                    <SelectItem value="es">{t.settings.language.spanish}</SelectItem>
                    <SelectItem value="de">{t.settings.language.german}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t.settings.notifications.title}
              </CardTitle>
              <CardDescription>{t.settings.notifications.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.settings.notifications.emailNotifications}</Label>
                  <p className="text-sm text-muted-foreground">{t.settings.notifications.emailDescription}</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.settings.notifications.marketingEmails}</Label>
                  <p className="text-sm text-muted-foreground">{t.settings.notifications.marketingDescription}</p>
                </div>
                <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t.settings.privacy.title}
              </CardTitle>
              <CardDescription>{t.settings.privacy.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.settings.privacy.exportData}</Label>
                  <p className="text-sm text-muted-foreground">{t.settings.privacy.exportDescription}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  {t.settings.privacy.export}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/40 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                {t.settings.danger.title}
              </CardTitle>
              <CardDescription>{t.settings.danger.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-destructive/20">
                <div>
                  <Label className="text-base">Sign Out</Label>
                  <p className="text-sm text-muted-foreground">Log out from your account</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sign Out</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to sign out from your account?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.settings.danger.deleteAccount}</Label>
                  <p className="text-sm text-muted-foreground">{t.settings.danger.deleteDescription}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      {t.settings.danger.deleteAccount}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t.settings.danger.deleteConfirmTitle}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t.settings.danger.deleteConfirmDescription}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t.settings.danger.cancel}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {t.settings.danger.delete}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
