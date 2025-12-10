"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sparkles,
  Play,
  CreditCard,
  Crown,
  History,
  Settings,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  User,
} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const { state } = useSidebar()

  const navMain = [
    {
      title: t.sidebar.playground,
      icon: Play,
      isActive: true,
      items: [
        { title: t.sidebar.analyzeVideo, url: "/analyze" },
        { title: t.sidebar.thumbnailGenerator, url: "/tools/thumbnail" },
        { title: t.sidebar.scriptGenerator, url: "/tools/script" },
      ],
    },
  ]

  const navSecondary = [
    { title: t.sidebar.history, url: "/history", icon: History },
    { title: t.nav.billing, url: "/billing", icon: CreditCard },
    { title: t.nav.settings, url: "/settings", icon: Settings },
  ]

  if (!user) return null

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">VidInsight</span>
                  <span className="truncate text-xs text-muted-foreground capitalize">{user.plan} {t.nav.plan}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Platform / Playground */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Quick Links */}
        <SidebarGroup>
          <SidebarMenu>
            {navSecondary.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Credits Display */}
        {state === "expanded" && (
          <div className="px-2 pb-2">
            <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">{t.sidebar.credits}</span>
                <span className="text-xs text-muted-foreground">{user.credits} {t.sidebar.remaining}</span>
              </div>
              <div className="h-1.5 rounded-full bg-sidebar-border overflow-hidden">
                <div
                  className="h-full bg-chart-1 transition-all"
                  style={{ width: `${Math.min((user.credits / 100) * 100, 100)}%` }}
                />
              </div>
              {user.plan === "free" && (
                <Link href="/upgrade">
                  <button className="mt-3 w-full rounded-md bg-primary py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    {t.sidebar.upgradeToPro}
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* User Menu */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar || undefined} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar || undefined} alt={user.name} />
                      <AvatarFallback className="rounded-lg">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {user.plan === "free" && (
                    <DropdownMenuItem asChild>
                      <Link href="/upgrade">
                        <Crown className="mr-2 h-4 w-4 text-chart-1" />
                        {t.sidebar.upgradeToPro}
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      {t.nav.profile}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      {t.nav.settings}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/billing">
                      <CreditCard className="mr-2 h-4 w-4" />
                      {t.nav.billing}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.nav.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
