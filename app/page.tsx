import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"
import { Button } from "@/components/ui/button"
import { Play, TrendingUp, Clock, Star, Film } from "lucide-react"
import { getDubindoDramas } from "@/lib/api/server"
import { LoadMoreDramas } from "@/components/load-more-dramas"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  // Fetch data dari API
  const initialDramas = await getDubindoDramas({ classify: "terbaru", page: 1 })
  const dramas = initialDramas

  // Featured video (drama pertama)
  const featuredDrama = dramas[0]
  const featuredVideo = featuredDrama
    ? {
      id: featuredDrama.id,
      title: featuredDrama.title,
      description: featuredDrama.description || "Tonton drama terbaru sekarang",
      thumbnail: featuredDrama.thumbnail,
    }
    : null

  // Trending (6 pertama)
  const trendingDramas = dramas.slice(0, 6)

  // Continue watching (4 berikutnya)
  const continueWatching = dramas.slice(6, 10)

  // Recommended (semua)
  const recommendedDramas = dramas

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Hero Section - Featured Video */}
        {featuredVideo && (
          <section className="mb-8 mt-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-primary/20 via-primary/10 to-background">
              {featuredVideo.thumbnail && (
                <Image
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="relative z-10 max-w-2xl">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                      Terbaru
                    </span>
                    {featuredDrama?.views && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {featuredDrama.views} views
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                    {featuredVideo.title}
                  </h2>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground sm:text-base md:text-lg">
                    {featuredVideo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="lg" className="gap-2" asChild>
                      <Link href={`/details/${featuredVideo.id}`}>
                        <Play className="size-4 fill-current" />
                        Putar Sekarang
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href={`/details/${featuredVideo.id}`}>
                        Info Selengkapnya
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/50 to-transparent" />
            </div>
          </section>
        )}

        {/* Trending Section */}
        {trendingDramas.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                <h2 className="text-xl font-bold sm:text-2xl">Terbaru</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-sm">
                Lihat Semua
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {trendingDramas.map((drama) => (
                <VideoCard
                  key={drama.id}
                  id={drama.id}
                  title={drama.title}
                  thumbnail={drama.thumbnail}
                  views={drama.views}
                />
              ))}
            </div>
          </section>
        )}

        {/* Continue Watching Section */}
        {continueWatching.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-primary" />
                <h2 className="text-xl font-bold sm:text-2xl">Lanjutkan Menonton</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-sm">
                Lihat Semua
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {continueWatching.map((drama) => (
                <VideoCard
                  key={drama.id}
                  id={drama.id}
                  title={drama.title}
                  thumbnail={drama.thumbnail}
                  views={drama.views}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Section */}
        {recommendedDramas.length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="size-5 text-primary" />
                <h2 className="text-xl font-bold sm:text-2xl">Rekomendasi</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-sm">
                Lihat Semua
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {recommendedDramas.map((drama) => (
                <VideoCard
                  key={drama.id}
                  id={drama.id}
                  title={drama.title}
                  thumbnail={drama.thumbnail}
                  views={drama.views}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Dramas Section with Load More */}
        {dramas.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="size-5 text-primary" />
                <h2 className="text-xl font-bold sm:text-2xl">Semua Drama</h2>
              </div>
            </div>
            <LoadMoreDramas
              initialDramas={dramas}
              initialPage={1}
              classify="terbaru"
            />
          </section>
        )}

        {/* Empty State */}
        {dramas.length === 0 && (
          <section className="py-12 text-center">
            <p className="text-muted-foreground">Tidak ada drama tersedia saat ini.</p>
          </section>
        )}
      </main>
    </div>
  )
}
