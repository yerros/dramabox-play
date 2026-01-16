import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"
import { SearchBar } from "@/components/search-bar"
import { searchDramas } from "@/lib/api/server"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cari Drama - DramaBox",
  description: "Cari drama favoritmu",
}

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

async function SearchResultsContent({ query }: { query: string }) {
  const dramas = await searchDramas({ query })

  if (dramas.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          Tidak ada hasil untuk &quot;{query}&quot;
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Coba gunakan kata kunci lain
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold sm:text-xl">
          Hasil Pencarian: &quot;{query}&quot;
        </h2>
        <p className="text-sm text-muted-foreground">
          Ditemukan {dramas.length} drama
        </p>
      </div>
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
    </div>
  )
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = q || ""

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 mt-6">
          <SearchBar defaultValue={query} />
        </div>

        {query ? (
          <Suspense
            key={query}
            fallback={
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Mencari...</p>
              </div>
            }
          >
            <SearchResultsContent query={query} />
          </Suspense>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              Masukkan kata kunci untuk mencari drama
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

