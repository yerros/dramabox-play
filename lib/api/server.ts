// Server-side API functions untuk Next.js Server Components
// Gunakan ini di Server Components (tidak perlu React Query)

import { apiClient } from "@/lib/api/client"
import { API_ENDPOINTS } from "@/lib/config/api"
import type {
  Drama,
  DramaDetail,
  Episode,
  SearchParams,
  DetailParams,
  PaginatedResponse,
  DramaBoxApiResponse,
} from "@/lib/types/api"
import {
  mapDramaBoxArrayToDrama,
  mapDramaBoxToDramaDetail,
} from "@/lib/utils/drama-mapper"
import { mapDramaBoxEpisodesToEpisodes } from "@/lib/utils/episode-mapper"
import type { DramaBoxEpisodeApiResponse } from "@/lib/types/api"

// Server-side functions untuk fetching data
// Note: Functions ini bisa digunakan langsung di Server Components

export async function getTrendingDramas(): Promise<Drama[]> {
  try {
    const data = await apiClient.get<DramaBoxApiResponse[]>(API_ENDPOINTS.trending)
    return mapDramaBoxArrayToDrama(data)
  } catch (error) {
    console.error("Error fetching trending dramas:", error)
    return []
  }
}

export async function getLatestDramas(
  page?: number,
  limit?: number
): Promise<Drama[]> {
  try {
    const queryParams: Record<string, string | number> = {}
    if (page !== undefined) {
      queryParams.page = page
    }
    if (limit !== undefined) {
      queryParams.limit = limit
    }
    const data = await apiClient.get<DramaBoxApiResponse[]>(
      API_ENDPOINTS.latest,
      queryParams
    )
    return mapDramaBoxArrayToDrama(data)
  } catch (error) {
    console.error("Error fetching latest dramas:", error)
    return []
  }
}

export async function getForYouDramas(): Promise<Drama[]> {
  try {
    const data = await apiClient.get<DramaBoxApiResponse[]>(API_ENDPOINTS.forYou)
    return mapDramaBoxArrayToDrama(data)
  } catch (error) {
    console.error("Error fetching for you dramas:", error)
    return []
  }
}

export async function getDramaDetail(id: string): Promise<DramaDetail | null> {
  try {
    const data = await apiClient.get<DramaBoxApiResponse>(API_ENDPOINTS.detail, {
      bookId: id,
    })
    return mapDramaBoxToDramaDetail(data)
  } catch (error) {
    console.error("Error fetching drama detail:", error)
    return null
  }
}

export async function getDramaEpisodes(dramaId: string): Promise<Episode[]> {
  try {
    const data = await apiClient.get<DramaBoxEpisodeApiResponse[]>(
      API_ENDPOINTS.allEpisode,
      {
        bookId: dramaId,
      }
    )

    if (Array.isArray(data) && data.length > 0) {
      return mapDramaBoxEpisodesToEpisodes(data)
    }

    // Fallback: generate episodes dari detail drama
    const detail = await getDramaDetail(dramaId)
    if (detail?.totalEpisodes) {
      return Array.from({ length: detail.totalEpisodes }, (_, i) => ({
        id: `${dramaId}-ep-${i + 1}`,
        number: i + 1,
        title: `Episode ${i + 1}`,
        isWatched: false,
      }))
    }

    return []
  } catch (error) {
    console.error("Error fetching episodes:", error)
    // Fallback: generate episodes dari detail drama
    try {
      const detail = await getDramaDetail(dramaId)
      if (detail?.totalEpisodes) {
        return Array.from({ length: detail.totalEpisodes }, (_, i) => ({
          id: `${dramaId}-ep-${i + 1}`,
          number: i + 1,
          title: `Episode ${i + 1}`,
          isWatched: false,
        }))
      }
    } catch {
      // Ignore
    }
    return []
  }
}

// Get single episode detail
export async function getEpisodeDetail(
  dramaId: string,
  episodeId: string
): Promise<Episode | null> {
  try {
    const episodes = await getDramaEpisodes(dramaId)
    return episodes.find((ep) => ep.id === episodeId) || null
  } catch (error) {
    console.error("Error fetching episode detail:", error)
    return null
  }
}

export async function searchDramas(
  params: SearchParams
): Promise<Drama[]> {
  try {
    const queryParams: Record<string, string | number> = {
      query: params.query,
    }
    if (params.page !== undefined) {
      queryParams.page = params.page
    }
    if (params.limit !== undefined) {
      queryParams.limit = params.limit
    }
    const data = await apiClient.get<DramaBoxApiResponse[]>(
      API_ENDPOINTS.search,
      queryParams
    )
    return mapDramaBoxArrayToDrama(data)
  } catch (error) {
    console.error("Error searching dramas:", error)
    return []
  }
}

export async function getVipDramas(params?: {
  page?: number
}): Promise<Drama[]> {
  try {
    const { DramaBoxService } = await import("@/lib/api/dramabox")
    const vipResponse = await DramaBoxService.getVip({ page: params?.page })
    
    // Extract all dramas from all columns and flatten into single array
    const allDramas: DramaBoxApiResponse[] = []
    if (vipResponse.columnVoList && Array.isArray(vipResponse.columnVoList)) {
      for (const column of vipResponse.columnVoList) {
        if (column.bookList && Array.isArray(column.bookList)) {
          allDramas.push(...column.bookList)
        }
      }
    }
    
    return mapDramaBoxArrayToDrama(allDramas)
  } catch (error) {
    console.error("Error fetching VIP dramas:", error)
    return []
  }
}

// Get Indonesian dubbed dramas (Dubindo)
export async function getDubindoDramas(params?: {
  classify?: string
  page?: number
}): Promise<Drama[]> {
  try {
    const queryParams: Record<string, string | number> = {}
    if (params?.classify !== undefined) {
      queryParams.classify = params.classify
    }
    if (params?.page !== undefined) {
      queryParams.page = params.page
    }
    const data = await apiClient.get<DramaBoxApiResponse[]>(
      API_ENDPOINTS.dubindo,
      queryParams
    )
    return mapDramaBoxArrayToDrama(data)
  } catch (error) {
    console.error("Error fetching dubindo dramas:", error)
    return []
  }
}

export async function getRandomDrama(): Promise<Drama | null> {
  try {
    return await apiClient.get<Drama>(API_ENDPOINTS.randomDrama)
  } catch (error) {
    console.error("Error fetching random drama:", error)
    return null
  }
}

