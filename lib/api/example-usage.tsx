/**
 * Contoh penggunaan API Client
 * File ini hanya sebagai referensi, tidak perlu di-import
 */

// ============================================
// 1. Server Component (Recommended)
// ============================================
import { getTrendingDramas, getLatestDramas, getDramaDetail } from "@/lib/api/server"

export async function ServerComponentExample() {
  // Fetch data di server
  const trending = await getTrendingDramas()
  const latest = await getLatestDramas(1, 20)
  const detail = await getDramaDetail("drama-id-123")

  return (
    <div>
      <h1>Trending Dramas</h1>
      {trending.map((drama) => (
        <div key={drama.id}>{drama.title}</div>
      ))}
    </div>
  )
}

// ============================================
// 2. Client Component dengan React Query
// ============================================
"use client"

import { useTrending, useDramaDetail } from "@/hooks/use-drama"

export function ClientComponentExample() {
  const { data: trending, isLoading, error } = useTrending()
  const { data: detail } = useDramaDetail("drama-id-123")

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {trending?.map((drama) => (
        <div key={drama.id}>{drama.title}</div>
      ))}
    </div>
  )
}

// ============================================
// 3. Direct Service Call
// ============================================
import { DramaBoxService } from "@/lib/api/dramabox"

export async function DirectServiceExample() {
  // Di dalam async function
  const dramas = await DramaBoxService.getTrending()
  const searchResults = await DramaBoxService.search({
    query: "romance",
    page: 1,
    limit: 10,
  })
  const episodes = await DramaBoxService.getAllEpisodes("drama-id")

  return dramas
}

// ============================================
// 4. Error Handling
// ============================================
import { ApiError } from "@/lib/api/client"

export async function ErrorHandlingExample() {
  try {
    const drama = await getDramaDetail("invalid-id")
    if (!drama) {
      // Handle not found
      return <div>Drama not found</div>
    }
    return <div>{drama.title}</div>
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("API Error:", error.status, error.message)
      return <div>Error: {error.message}</div>
    }
    throw error
  }
}

// ============================================
// 5. Search dengan Pagination
// ============================================
import { searchDramas } from "@/lib/api/server"
import type { PaginatedResponse, Drama } from "@/lib/types/api"

export async function SearchExample() {
  const results = await searchDramas({
    query: "romance",
    page: 1,
    limit: 20,
  })

  // Handle paginated response
  if (Array.isArray(results)) {
    // Simple array response
    return results.map((drama) => drama.title)
  } else {
    // Paginated response
    const paginatedResults = results as PaginatedResponse<Drama>
    return {
      dramas: paginatedResults.data,
      total: paginatedResults.total,
      hasMore: paginatedResults.hasMore,
    }
  }
}

