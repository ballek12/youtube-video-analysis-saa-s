"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { Tables } from "@/lib/supabase/database.types"

type Profile = Tables<"profiles">

export interface User {
  id: string
  email: string
  name: string
  plan: "free" | "pro" | "enterprise"
  credits: number
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function mapProfileToUser(profile: Profile, supabaseUser: SupabaseUser): User {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    plan: profile.plan as "free" | "pro" | "enterprise",
    credits: profile.credits,
    avatar: profile.avatar || undefined,
    createdAt: profile.created_at,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabaseRef = useRef<any>(null)

  if (!supabaseRef.current) {
    supabaseRef.current = createClient()
  }

  const supabase = supabaseRef.current

  useEffect(() => {
    try {
      // Vérifier la session actuelle
      supabase.auth.getSession().then(({ data: { session } }: any) => {
        if (session?.user) {
          loadUserProfile(session.user.id)
        } else {
          setIsLoading(false)
        }
      }).catch((error: any) => {
        console.error("Error getting session:", error)
        setIsLoading(false)
      })

      // Écouter les changements d'authentification
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
        if (session?.user) {
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setIsLoading(false)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error initializing auth provider:", error)
      setIsLoading(false)
    }
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Profile fetch error:", error)
        setIsLoading(false)
        return
      }

      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser()

      if (supabaseUser && profile) {
        setUser(mapProfileToUser(profile, supabaseUser))
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      })

      if (error) {
        console.error("Login error:", error)
        return false
      }

      if (data.user) {
        await loadUserProfile(data.user.id)
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        console.error("Signup error:", error)
        return false
      }

      if (data.user) {
        // Le profil sera créé automatiquement par le trigger
        // Attendre un peu pour que le trigger s'exécute
        await new Promise((resolve) => setTimeout(resolve, 500))
        await loadUserProfile(data.user.id)
        return true
      }

      return false
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      setUser(null)
    }
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return

    try {
      const updateData: Partial<Profile> = {}
      if (updates.name !== undefined) updateData.name = updates.name
      if (updates.plan !== undefined) updateData.plan = updates.plan
      if (updates.credits !== undefined) updateData.credits = updates.credits
      if (updates.avatar !== undefined) updateData.avatar = updates.avatar || null

      const { data, error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id)
        .select()
        .single()

      if (error) throw error

      if (data) {
        const {
          data: { user: supabaseUser },
        } = await supabase.auth.getUser()

        if (supabaseUser) {
          setUser(mapProfileToUser(data, supabaseUser))
        }
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
