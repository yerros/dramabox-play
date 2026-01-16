import { Header } from "@/components/header"
import { EpisodeList } from "@/components/episode-list"
import { Button } from "@/components/ui/button"
import {
  Play,
  Star,
  Calendar,
  Users,
  Heart,
  Share2,
  ArrowLeft,
  Clock,
  Film,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getDramaDetail, getDramaEpisodes } from "@/lib/api/server"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: PageProps) {
  const { id } = await params
  const drama = await getDramaDetail(id)
  const episodes = await getDramaEpisodes(id)

  // Show 404 if drama not found
  if (!drama) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-4 mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mt-6"
        >
          <ArrowLeft className="size-4" />
          Kembali
        </Link>

        {/* Hero Section */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Thumbnail */}
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-border/50 bg-muted sm:w-64 lg:w-80">
              {drama.thumbnail ? (
                <Image
                  src={drama.thumbnail}
                  alt={drama.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <Film className="size-16 text-primary/50" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {drama.genre && drama.genre.length > 0 ? (
                    drama.genre.map((g) => (
                      <span
                        key={g}
                        className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                      Drama
                    </span>
                  )}
                </div>
                <h1 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                  {drama.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {drama.totalEpisodes && (
                    <span className="flex items-center gap-1">
                      <Film className="size-4" />
                      {drama.totalEpisodes} Episode
                    </span>
                  )}
                  {drama.views && (
                    <span className="flex items-center gap-1">
                      <Users className="size-4" />
                      {drama.views} views
                    </span>
                  )}
                  {(drama as any).shelfTime && (
                    <span className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      {new Date((drama as any).shelfTime).getFullYear()}
                    </span>
                  )}
                </div>
              </div>

              {drama.description && (
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {drama.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {episodes.length > 0 && (
                  <Button size="lg" className="gap-2" asChild>
                    <Link href={`/details/${id}/episode/${episodes[0].id}`}>
                      <Play className="size-4 fill-current" />
                      Putar Episode 1
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="lg" className="gap-2">
                  <Heart className="size-4" />
                  Favorit
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Share2 className="size-4" />
                  Bagikan
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Long Description */}
        {drama.longDescription && (
          <section className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-lg font-semibold sm:text-xl">Sinopsis</h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {drama.longDescription}
            </p>
          </section>
        )}

        {/* Episode List */}
        {episodes.length > 0 && (
          <section>
            <EpisodeList
              episodes={episodes}
              dramaId={id}
              className="mb-8"
            />
          </section>
        )}

        {/* Empty State */}
        {episodes.length === 0 && (
          <section className="py-12 text-center">
            <p className="text-muted-foreground">Episode belum tersedia.</p>
          </section>
        )}
      </main>
    </div>
  )
}

