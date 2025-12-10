"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FileText, Sparkles, Copy, RefreshCw, Target, Clock, Mic, Download } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { toast } from "sonner"

export default function ScriptGeneratorPage() {
  const { user, updateUser } = useAuth()
  const { t } = useI18n()

  const [topic, setTopic] = useState("")
  const [niche, setNiche] = useState("")
  const [tone, setTone] = useState("educational")
  const [format, setFormat] = useState("hook-content-cta")
  const [duration, setDuration] = useState([8])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")

  const tones = [
    { value: "educational", label: t.scriptGenerator.tones.educational },
    { value: "entertaining", label: t.scriptGenerator.tones.entertaining },
    { value: "inspirational", label: t.scriptGenerator.tones.inspirational },
    { value: "controversial", label: t.scriptGenerator.tones.controversial },
    { value: "storytelling", label: t.scriptGenerator.tones.storytelling },
    { value: "tutorial", label: t.scriptGenerator.tones.tutorial },
  ]

  const formats = [
    { value: "hook-content-cta", label: t.scriptGenerator.formats["hook-content-cta"] },
    { value: "problem-solution", label: t.scriptGenerator.formats["problem-solution"] },
    { value: "listicle", label: t.scriptGenerator.formats.listicle },
    { value: "story", label: t.scriptGenerator.formats.story },
    { value: "challenge", label: t.scriptGenerator.formats.challenge },
  ]

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error(t.scriptGenerator.pleaseEnterTopic)
      return
    }
    if (user && user.credits <= 0) {
      toast.error(t.analyze.noCredits)
      return
    }

    setIsGenerating(true)

    await new Promise((r) => setTimeout(r, 3000))

    const script = generateMockScript(topic, niche, tone, format, duration[0])
    setGeneratedScript(script)

    if (user) {
      updateUser({ credits: user.credits - 1 })
    }

    toast.success(t.nav.analyze)
    setIsGenerating(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript)
    toast.success(t.scriptGenerator.scriptCopied)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedScript], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `script-${topic.replace(/\s+/g, "-").toLowerCase()}.md`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(t.scriptGenerator.scriptDownloaded)
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/10 text-chart-2 flex-shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{t.scriptGenerator.title}</h1>
            <p className="text-muted-foreground text-xs sm:text-sm">{t.scriptGenerator.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border/40 bg-card/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-chart-2" />
                  {t.scriptGenerator.scriptParameters}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-sm">
                    {t.scriptGenerator.topicTitle}
                  </Label>
                  <Input
                    id="topic"
                    placeholder={t.scriptGenerator.topicPlaceholder}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-background border-border/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niche" className="text-sm">
                    {t.scriptGenerator.niche}
                  </Label>
                  <Input
                    id="niche"
                    placeholder={t.scriptGenerator.nichePlaceholder}
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="bg-background border-border/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Mic className="h-3.5 w-3.5 flex-shrink-0" />
                    {t.scriptGenerator.tone}
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-background w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">{t.scriptGenerator.format}</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="bg-background w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm">
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    {t.scriptGenerator.duration}: {duration[0]} {t.scriptGenerator.min}
                  </Label>
                  <Slider value={duration} onValueChange={setDuration} min={1} max={30} step={1} className="py-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 {t.scriptGenerator.min}</span>
                    <span>30 {t.scriptGenerator.min}</span>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full bg-chart-2 hover:bg-chart-2/90 text-white text-sm sm:text-base"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      <span className="hidden sm:inline">{t.scriptGenerator.generatingButton}</span>
                      <span className="sm:hidden">{t.scriptGenerator.generatingButton}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">{t.scriptGenerator.generateButton}</span>
                      <span className="sm:hidden">{t.scriptGenerator.generateButton}</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-xl border border-border/40 bg-card/30 p-3 sm:p-4">
              <p className="text-xs font-medium mb-2">{t.scriptGenerator.tipsForViralScripts}</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {t.scriptGenerator.tipsItems.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <Card className="border-border/40 bg-card/30 h-full">
              <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="min-w-0">
                  <CardTitle className="text-base">{t.scriptGenerator.generatedScript}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{t.scriptGenerator.yourAiGeneratedScript}</CardDescription>
                </div>
                {generatedScript && (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1 sm:flex-initial">
                      <Copy className="mr-2 h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t.scriptGenerator.copyButton}</span>
                      <span className="sm:hidden">{t.scriptGenerator.copyButton}</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} className="flex-1 sm:flex-initial">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t.scriptGenerator.downloadButton}</span>
                      <span className="sm:hidden">{t.scriptGenerator.downloadButton}</span>
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {!generatedScript ? (
                  <div className="rounded-xl border border-dashed border-border/60 bg-background/50 p-8 sm:p-12 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-chart-2/10">
                      <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-chart-2" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base">{t.scriptGenerator.noScriptYet}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{t.scriptGenerator.enterTopicAndGenerate}</p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-border/40 bg-background/50 p-3 sm:p-4">
                    <Textarea
                      value={generatedScript}
                      onChange={(e) => setGeneratedScript(e.target.value)}
                      className="min-h-[400px] sm:min-h-[500px] bg-transparent border-0 resize-none focus-visible:ring-0 text-xs sm:text-sm leading-relaxed font-mono"
                    />
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

function generateMockScript(topic: string, niche: string, tone: string, format: string, duration: number): string {
  return `# ${topic}
## Video Script (${duration} minutes) | ${niche || "General"} | ${tone}

---

### HOOK (0:00 - 0:30)
[PATTERN INTERRUPT]
"Stop everything you're doing right now. What I'm about to tell you about ${topic.toLowerCase()} could completely change your perspective."

[BUILD CURIOSITY]
"Most people get this completely wrong, and it's costing them more than they realize. By the end of this video, you'll understand exactly why."

---

### INTRO (0:30 - 1:00)
"Hey everyone, welcome back to the channel. Today we're diving deep into ${topic.toLowerCase()}."

"If you're new here, make sure to subscribe and hit that notification bell because we drop content like this every week."

---

### MAIN CONTENT

#### Section 1: The Problem (1:00 - ${Math.floor(duration / 3)}:00)
"Here's what most people don't understand..."

- Key Point 1: [Explain the common misconception]
- Key Point 2: [Show the real-world impact]
- Key Point 3: [Create emotional connection]

[B-ROLL SUGGESTION: Show relevant examples]

#### Section 2: The Solution (${Math.floor(duration / 3)}:00 - ${Math.floor((duration * 2) / 3)}:00)
"Now that you understand the problem, here's exactly how to fix it..."

- Step 1: [Actionable advice]
- Step 2: [Practical implementation]
- Step 3: [Expected results]

[PATTERN INTERRUPT]
"And here's the part that most 'experts' won't tell you..."

#### Section 3: Advanced Tips (${Math.floor((duration * 2) / 3)}:00 - ${duration - 1}:00)
"If you want to take this to the next level..."

- Pro Tip 1: [Advanced technique]
- Pro Tip 2: [Common pitfall to avoid]
- Pro Tip 3: [Secret strategy]

---

### CALL TO ACTION (${duration - 1}:00 - ${duration}:00)
"If you found this valuable, smash that like button and drop a comment below!"

"Thanks for watching, and I'll see you in the next one!"

---

### SUGGESTED TITLES
1. "${topic} (Nobody Talks About This)"
2. "The Truth About ${topic}"
3. "${topic}: What They Don't Want You to Know"
`
}
