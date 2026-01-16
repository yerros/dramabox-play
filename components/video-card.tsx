import { Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface VideoCardProps {
  id?: string
  title: string
  thumbnail?: string
  duration?: string
  views?: string
  className?: string
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  views,
  className,
}: VideoCardProps) {
  const cardContent = (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-lg",
        className
      )}
    >
      {/* Portrait poster image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <Play className="size-12 text-primary/50" />
          </div>
        )}
        
        {/* Overlay with play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
          <div className="rounded-full bg-primary/90 p-3 opacity-0 transition-opacity group-hover:opacity-100 shadow-lg">
            <Play className="size-5 fill-white text-white" />
          </div>
        </div>

        {/* Episode count badge */}
        {duration && (
          <div className="absolute top-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {duration}
          </div>
        )}
      </div>

      {/* Card content */}
      <CardContent className="p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {views && (
          <p className="mt-1.5 text-xs text-muted-foreground">{views} views</p>
        )}
      </CardContent>
    </Card>
  )

  if (id) {
    return (
      <Link href={`/details/${id}`} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

