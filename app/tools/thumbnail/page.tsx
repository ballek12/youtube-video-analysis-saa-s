"use client"

import { useState, useRef, useCallback } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Sparkles, Download, RefreshCw, Wand2, Palette, Layout, Check, Upload, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function ThumbnailGeneratorPage() {
  const { user, updateUser } = useAuth()
  const { t } = useI18n()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const [prompt, setPrompt] = useState("")
  const [title, setTitle] = useState("")
  const [style, setStyle] = useState("modern")
  const [colorScheme, setColorScheme] = useState("auto")
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedThumbnails, setGeneratedThumbnails] = useState<string[]>([])
  const [selectedThumbnail, setSelectedThumbnail] = useState<number | null>(null)

  const styles = [
    { value: "modern", label: t.thumbnailGenerator.styles.modern },
    { value: "bold", label: t.thumbnailGenerator.styles.bold },
    { value: "minimal", label: t.thumbnailGenerator.styles.minimal },
    { value: "gaming", label: t.thumbnailGenerator.styles.gaming },
    { value: "vlog", label: t.thumbnailGenerator.styles.vlog },
    { value: "tech", label: t.thumbnailGenerator.styles.tech },
  ]

  const colorSchemes = [
    { value: "auto", label: t.thumbnailGenerator.colorSchemes.auto, color: "bg-gradient-to-r from-primary to-chart-2" },
    { value: "warm", label: t.thumbnailGenerator.colorSchemes.warm, color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { value: "cool", label: t.thumbnailGenerator.colorSchemes.cool, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { value: "neon", label: t.thumbnailGenerator.colorSchemes.neon, color: "bg-gradient-to-r from-pink-500 to-purple-500" },
    { value: "pastel", label: t.thumbnailGenerator.colorSchemes.pastel, color: "bg-gradient-to-r from-pink-300 to-blue-300" },
    { value: "dark", label: t.thumbnailGenerator.colorSchemes.dark, color: "bg-gradient-to-r from-gray-700 to-gray-900" },
  ]

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error(t.thumbnailGenerator.imageMustBeImage)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error(t.thumbnailGenerator.imageTooLarge)
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setReferenceImage(reader.result as string)
      toast.success(t.thumbnailGenerator.referenceImageUploaded)
    }
    reader.onerror = () => {
      toast.error(t.thumbnailGenerator.failedToReadImage)
    }
    reader.readAsDataURL(file)
  }, [t])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )

  const removeReferenceImage = useCallback(() => {
    setReferenceImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error(t.thumbnailGenerator.pleaseDescribeThumbnail)
      return
    }
    if (user && user.credits <= 0) {
      toast.error(t.analyze.noCredits)
      return
    }

    setIsGenerating(true)
    setSelectedThumbnail(null)

    await new Promise((r) => setTimeout(r, 3000))

    const baseQuery = referenceImage
      ? `${prompt} inspired by reference image`
      : prompt

    const thumbnails = [
      `/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(baseQuery + " youtube thumbnail " + style)}`,
      `/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(baseQuery + " thumbnail design " + colorScheme)}`,
      `/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(baseQuery + " video cover " + style + " style")}`,
      `/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(baseQuery + " youtube banner " + colorScheme + " colors")}`,
    ]

    setGeneratedThumbnails(thumbnails)

    if (user) {
      updateUser({ credits: user.credits - 1 })
    }

    toast.success(t.thumbnailGenerator.thumbnailsGenerated)
    setIsGenerating(false)
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{t.thumbnailGenerator.title}</h1>
            <p className="text-muted-foreground text-xs sm:text-sm">{t.thumbnailGenerator.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border/40 bg-card/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-primary" />
                  {t.thumbnailGenerator.describeYourThumbnail}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-sm">
                    {t.thumbnailGenerator.description}
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder={t.thumbnailGenerator.descriptionPlaceholder}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] bg-background border-border/60 text-sm resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm">
                    {t.thumbnailGenerator.textOverlay}
                  </Label>
                  <Input
                    id="title"
                    placeholder={t.thumbnailGenerator.textOverlayPlaceholder}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-background border-border/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">{t.thumbnailGenerator.referenceImage}</Label>
                  {referenceImage ? (
                    <div className="relative group">
                      <div className="aspect-video rounded-lg overflow-hidden border-2 border-border/40 bg-background/50">
                        <img
                          src={referenceImage}
                          alt="Reference"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={removeReferenceImage}
                        className="absolute top-2 right-2 h-7 w-7 rounded-full bg-destructive/90 hover:bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove reference image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "relative cursor-pointer rounded-lg border-2 border-dashed transition-all",
                        isDragging
                          ? "border-primary bg-primary/5 scale-[1.02]"
                          : "border-border/60 bg-background/50 hover:border-border/80 hover:bg-background/70",
                      )}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Upload className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm font-medium mb-1">
                          {isDragging ? t.thumbnailGenerator.dropImageHere : t.thumbnailGenerator.dragDropImage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.thumbnailGenerator.supportedFormats}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Layout className="h-3.5 w-3.5 flex-shrink-0" />
                    {t.thumbnailGenerator.style}
                  </Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-background w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Palette className="h-3.5 w-3.5 flex-shrink-0" />
                    {t.thumbnailGenerator.colorScheme}
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorSchemes.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setColorScheme(c.value)}
                        className={cn(
                          "relative h-8 sm:h-9 rounded-lg transition-all",
                          c.color,
                          colorScheme === c.value
                            ? "ring-2 ring-primary ring-offset-1 sm:ring-offset-2 ring-offset-background"
                            : "opacity-70 hover:opacity-100",
                        )}
                        title={c.label}
                        aria-label={c.label}
                      >
                        {colorScheme === c.value && (
                          <Check className="absolute inset-0 m-auto h-3.5 w-3.5 sm:h-4 sm:w-4 text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {colorSchemes.find((c) => c.value === colorScheme)?.label}
                  </p>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      <span className="hidden sm:inline">{t.thumbnailGenerator.generatingButton}</span>
                      <span className="sm:hidden">{t.thumbnailGenerator.generatingButton}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">{t.thumbnailGenerator.generateButton}</span>
                      <span className="sm:hidden">{t.thumbnailGenerator.generateButton}</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-xl border border-border/40 bg-card/30 p-3 sm:p-4">
              <p className="text-xs font-medium mb-2">Tips for great thumbnails:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>- Use faces with expressions</li>
                <li>- Keep text large and readable</li>
                <li>- Use contrasting colors</li>
                <li>- Create curiosity or urgency</li>
              </ul>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <Card className="border-border/40 bg-card/30 h-full">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <CardTitle className="text-base">{t.thumbnailGenerator.generatedThumbnails}</CardTitle>
                  {selectedThumbnail !== null && (
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Download Selected</span>
                      <span className="sm:hidden">Télécharger</span>
                    </Button>
                  )}
                </div>
                <CardDescription className="text-xs sm:text-sm">Click to select, then download</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedThumbnails.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/60 bg-background/50 p-8 sm:p-12 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/10">
                      <ImageIcon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base">{t.thumbnailGenerator.noThumbnailsYet}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{t.thumbnailGenerator.enterDescriptionAndGenerate}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {generatedThumbnails.map((thumbnail, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedThumbnail(index)}
                        className={cn(
                          "group relative aspect-video rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all w-full",
                          selectedThumbnail === index
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border/40 hover:border-border/60",
                        )}
                      >
                        <img
                          src={thumbnail || "/placeholder.svg"}
                          alt={`Generated thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {selectedThumbnail === index && (
                          <div className="absolute top-2 right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs sm:text-sm font-medium">Select</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
