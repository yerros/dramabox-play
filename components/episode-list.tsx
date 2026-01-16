"use client"

import { Play, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Episode {
  id: string
  number: number
  title: string
  duration: string
  thumbnail?: string
  isWatched?: boolean
}

interface EpisodeListProps {
  episodes: Episode[]
  currentEpisodeId?: string
  dramaId: string
  className?: string
}

export function EpisodeList({
  episodes,
  currentEpisodeId,
  dramaId,
  className,
}: EpisodeListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold sm:text-xl">Daftar Episode</h3>
        <span className="text-sm text-muted-foreground">
          {episodes.length} Episode
        </span>
      </div>

      <div className="space-y-2">
        {episodes.map((episode) => {
          const isActive = episode.id === currentEpisodeId
          const href = `/details/${dramaId}/episode/${episode.id}`

          return (
            <Link
              key={episode.id}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg border border-border/50 bg-card p-3 transition-all hover:border-primary/50 hover:bg-accent/50 sm:p-4",
                isActive && "border-primary bg-primary/10"
              )}
            >
              {/* Episode Number */}
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-sm font-semibold transition-colors sm:size-12",
                  isActive && "border-primary bg-primary text-primary-foreground"
                )}
              >
                {episode.number}
              </div>

              {/* Episode Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4
                      className={cn(
                        "line-clamp-1 text-sm font-medium sm:text-base",
                        isActive && "text-primary"
                      )}
                    >
                      {episode.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      {episode.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {episode.duration}
                        </span>
                      )}
                      {episode.isWatched && (
                        <span className="flex items-center gap-1 text-primary">
                          <CheckCircle2 className="size-3" />
                          Ditonton
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault()
                      // Handle play action
                    }}
                  >
                    <Play className="size-4 fill-current" />
                  </Button>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

