import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"
import { LoadMoreDramas } from "@/components/load-more-dramas"
import { Film, Star, TrendingUp, Sparkles, Shuffle, Search } from "lucide-react"
import {
  getDubindoDramas,
  getVipDramas,
  getTrendingDramas,
  getForYouDramas,
  getLatestDramas,
} from "@/lib/api/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Drama } from "@/lib/types/api"

interface PageProps {
  params: Promise<{ category: string }>
}

const categoryConfig: Record<
  string,
  {
    title: string
    icon: React.ReactNode
    fetchFunction: (params?: { classify?: string; page?: number }) => Promise<Drama[]>
    classify?: string
    useLoadMore?: boolean
  }
> = {
  vip: {
    title: "VIP",
    icon: <Star className="size-5" />,
    fetchFunction: async (params) => getVipDramas({ page: params?.page }),
    useLoadMore: true,
  },
  dubindo: {
    title: "Dubindo",
    icon: <Film className="size-5" />,
    fetchFunction: (params) => getDubindoDramas({ classify: params?.classify || "terbaru", page: params?.page }),
    classify: "terbaru",
    useLoadMore: true,
  },
  random: {
    title: "Random Drama",
    icon: <Shuffle className="size-5" />,
    fetchFunction: async () => {
      // Random drama - get 10 random from dubindo
      const dramas = await getDubindoDramas({ classify: "terbaru", page: 1 })
      if (dramas.length > 0) {
        const shuffled = [...dramas].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 10)
      }
      return []
    },
    useLoadMore: false,
  },
  foryou: {
    title: "For You",
    icon: <Sparkles className="size-5" />,
    fetchFunction: getForYouDramas,
    useLoadMore: false,
  },
  latest: {
    title: "Terbaru",
    icon: <TrendingUp className="size-5" />,
    fetchFunction: async (params) => getLatestDramas(params?.page, 20),
    useLoadMore: true,
  },
  trending: {
    title: "Trending",
    icon: <TrendingUp className="size-5" />,
    fetchFunction: getTrendingDramas,
    useLoadMore: false,
  },
  "popular-search": {
    title: "Pencarian Populer",
    icon: <Search className="size-5" />,
    fetchFunction: async () => {
      // Popular search returns search terms, not dramas
      // Show trending instead for now
      return getTrendingDramas()
    },
    useLoadMore: false,
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const config = categoryConfig[category]

  if (!config) {
    return {
      title: "Kategori Tidak Ditemukan - DramaBox",
    }
  }

  return {
    title: `${config.title} - DramaBox`,
    description: `Lihat semua drama di kategori ${config.title}`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const config = categoryConfig[category]

  if (!config) {
    notFound()
  }

  const initialDramas = await config.fetchFunction({ classify: config.classify, page: 1 })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 mt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="text-primary">{config.icon}</div>
            <h1 className="text-2xl font-bold sm:text-3xl">{config.title}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {initialDramas.length > 0
              ? `Ditemukan ${initialDramas.length} drama`
              : "Tidak ada drama tersedia"}
          </p>
        </div>

        {/* Drama Grid */}
        {initialDramas.length > 0 ? (
          config.useLoadMore ? (
            <LoadMoreDramas
              initialDramas={initialDramas}
              initialPage={1}
              classify={config.classify}
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {initialDramas.map((drama) => (
                <VideoCard
                  key={drama.id}
                  id={drama.id}
                  title={drama.title}
                  thumbnail={drama.thumbnail}
                  views={drama.views}
                />
              ))}
            </div>
          )
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              Tidak ada drama tersedia di kategori ini.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

