"use client"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Calendar, CreditCard, Shield, Camera, X, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { format } from "date-fns"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty")
      return
    }
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 500))
    updateUser({ name: name.trim() })
    toast.success("Profile updated successfully")
    setIsSaving(false)
  }

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    setIsUploadingAvatar(true)
    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreviewUrl(result)
      }
      reader.readAsDataURL(file)

      // Convert to base64 and save
      const reader2 = new FileReader()
      reader2.onload = async (event) => {
        const base64Data = event.target?.result as string
        await updateUser({ avatar: base64Data })
        toast.success("Profile picture updated successfully")
      }
      reader2.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast.error("Failed to upload image")
    } finally {
      setIsUploadingAvatar(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveAvatar = async () => {
    setPreviewUrl("")
    await updateUser({ avatar: undefined })
    toast.success("Profile picture removed")
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your account information</p>

        <div className="mt-8 space-y-6">
          {/* Avatar Card */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg">Profile Picture</CardTitle>
              <CardDescription>Your avatar is visible across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/40 to-chart-2/40 flex items-center justify-center text-3xl font-bold overflow-hidden">
                    {previewUrl || user.avatar ? (
                      <img
                        src={previewUrl || user.avatar}
                        alt={user.name}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isUploadingAvatar ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {isUploadingAvatar ? "Uploading..." : "Upload Photo"}
                    </Button>
                    {(previewUrl || user.avatar) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveAvatar}
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info Card */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-background border-border/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="pl-10 bg-background border-border/60 opacity-60"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
              <CardDescription>Your account details and subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border/40 bg-background/50 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Plan</span>
                  </div>
                  <p className="text-lg font-semibold capitalize">{user.plan}</p>
                </div>
                <div className="rounded-xl border border-border/40 bg-background/50 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Credits</span>
                  </div>
                  <p className="text-lg font-semibold">{user.credits} remaining</p>
                </div>
                <div className="rounded-xl border border-border/40 bg-background/50 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <p className="text-lg font-semibold">{format(new Date(user.createdAt), "MMM yyyy")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
