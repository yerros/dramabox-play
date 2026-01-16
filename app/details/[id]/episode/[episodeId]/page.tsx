import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getDramaDetail, getDramaEpisodes, getEpisodeDetail } from "@/lib/api/server"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string; episodeId: string }>
}

export default async function EpisodePage({ params }: PageProps) {
  const { id, episodeId } = await params

  const [drama, episodes, currentEpisode] = await Promise.all([
    getDramaDetail(id),
    getDramaEpisodes(id),
    getEpisodeDetail(id, episodeId),
  ])

  if (!drama || !currentEpisode) {
    notFound()
  }

  // Find current episode index
  const currentIndex = episodes.findIndex((ep) => ep.id === episodeId)
  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null
  const nextEpisode =
    currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-4 mt-4 flex items-center gap-4 sm:mt-6">
          <Link
            href={`/details/${id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Detail
          </Link>
        </div>

        {/* Video Player Section */}
        <section className="mb-6">
          <div className="mb-4">
            <h1 className="mb-2 text-xl font-bold sm:text-2xl">
              {drama.title}
            </h1>
            <h2 className="text-lg font-semibold text-muted-foreground">
              {currentEpisode.title}
            </h2>
          </div>

          {/* Video Player */}
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-md rounded-lg border border-border/50 bg-card overflow-hidden">
              <VideoPlayer
                src={currentEpisode.videoUrl || ""}
                videoUrls={currentEpisode.videoUrls}
                title={currentEpisode.title}
                poster={currentEpisode.thumbnail || drama.thumbnail}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={!prevEpisode}
              asChild={!!prevEpisode}
            >
              {prevEpisode ? (
                <Link href={`/details/${id}/episode/${prevEpisode.id}`}>
                  <ChevronLeft className="size-4" />
                  Episode Sebelumnya
                </Link>
              ) : (
                <>
                  <ChevronLeft className="size-4" />
                  Episode Sebelumnya
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Episode {currentEpisode.number} dari {episodes.length}
            </div>

            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={!nextEpisode}
              asChild={!!nextEpisode}
            >
              {nextEpisode ? (
                <Link href={`/details/${id}/episode/${nextEpisode.id}`}>
                  Episode Selanjutnya
                  <ChevronRight className="size-4" />
                </Link>
              ) : (
                <>
                  Episode Selanjutnya
                  <ChevronRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </section>

        {/* Episode List */}
        <section>
          <h3 className="mb-4 text-lg font-semibold">Daftar Episode</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {episodes.map((episode) => {
              const isActive = episode.id === episodeId
              return (
                <Link
                  key={episode.id}
                  href={`/details/${id}/episode/${episode.id}`}
                  className={cn(
                    "group relative aspect-video overflow-hidden rounded-lg border-2 transition-all",
                    isActive
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-card hover:border-primary/50"
                  )}
                >
                  {episode.thumbnail ? (
                    <Image
                      src={episode.thumbnail}
                      alt={episode.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {episode.number}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <div
                      className={cn(
                        "rounded-full bg-primary/90 p-2 opacity-0 transition-opacity group-hover:opacity-100",
                        isActive && "opacity-100"
                      )}
                    >
                      <Play className="size-4 fill-white text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-xs font-medium text-white">
                      {episode.title}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

