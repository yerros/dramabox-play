"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { Loader2 } from "lucide-react"
import type { Drama } from "@/lib/types/api"

interface LoadMoreDramasProps {
  initialDramas: Drama[]
  initialPage: number
  classify?: string
}

export function LoadMoreDramas({
  initialDramas,
  initialPage,
  classify = "terbaru",
}: LoadMoreDramasProps) {
  const [dramas, setDramas] = useState<Drama[]>(initialDramas)
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const response = await fetch(
        `/api/dramas?classify=${classify}&page=${page + 1}`
      )
      const data = await response.json()

      if (data.length === 0) {
        setHasMore(false)
      } else {
        setDramas((prev) => [...prev, ...data])
        setPage((prev) => prev + 1)
        // If returned less than expected, assume no more
        if (data.length < 20) {
          setHasMore(false)
        }
      }
    } catch (error) {
      console.error("Error loading more dramas:", error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {dramas.map((drama) => (
          <VideoCard
            key={drama.id}
            id={drama.id}
            title={drama.title}
            thumbnail={drama.thumbnail}
            views={drama.views}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={loadMore}
            disabled={loading}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Memuat...
              </>
            ) : (
              "Muat Lebih Banyak"
            )}
          </Button>
        </div>
      )}

      {!hasMore && dramas.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Semua drama telah dimuat
        </div>
      )}
    </>
  )
}

