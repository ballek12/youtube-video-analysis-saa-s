import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, ThumbsUp, MessageCircle, Calendar, User } from "lucide-react"
import type { VideoInfo } from "@/lib/types"

interface VideoPreviewProps {
  video: VideoInfo
}

export function VideoPreview({ video }: VideoPreviewProps) {
  return (
    <Card className="bg-card/50 border-border/40 overflow-hidden">
      <div className="aspect-video relative">
        <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
          {video.duration}
        </div>
      </div>

      <CardHeader className="pb-2">
        <h2 className="font-semibold text-lg leading-tight line-clamp-2">{video.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{video.channel}</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <MetricBadge icon={Eye} value={video.views} label="views" />
          <MetricBadge icon={ThumbsUp} value={video.likes} label="likes" />
          <MetricBadge icon={MessageCircle} value={video.comments} label="comments" />
          <MetricBadge icon={Calendar} value={video.publishedAt} label="" />
        </div>

        {video.tags && video.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {video.tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MetricBadge({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-foreground font-medium">{value}</span>
      {label && <span className="text-muted-foreground">{label}</span>}
    </div>
  )
}
