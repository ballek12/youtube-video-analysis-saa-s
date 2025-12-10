"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const pathNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analyze": "Analyze Video",
  "/tools/thumbnail": "Thumbnail Generator",
  "/tools/script": "Script Generator",
  "/profile": "Profile",
  "/settings": "Settings",
  "/upgrade": "Upgrade Plan",
  "/history": "History",
  "/billing": "Billing",
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const currentPage = pathNames[pathname] || "Dashboard"

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-3 sm:px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
            <SidebarTrigger className="-ml-1 flex-shrink-0" />
            <Separator orientation="vertical" className="mr-1 sm:mr-2 h-4 hidden sm:block" />
            <Breadcrumb className="min-w-0">
              <BreadcrumbList className="flex-wrap">
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard" className="text-sm">VidInsight</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="text-sm sm:text-base truncate">{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 sm:h-9 sm:w-9">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 sm:pt-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
