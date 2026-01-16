import type { Drama, DramaDetail, DramaBoxApiResponse } from "@/lib/types/api"

/**
 * Map API response ke format Drama yang digunakan aplikasi
 */
export function mapDramaBoxToDrama(apiDrama: DramaBoxApiResponse): Drama {
  return {
    id: apiDrama.bookId,
    title: apiDrama.bookName?.trim() || "",
    description: apiDrama.introduction,
    thumbnail: apiDrama.coverWap || apiDrama.cover, // Support both coverWap and cover
    poster: apiDrama.coverWap || apiDrama.cover,
    genre: apiDrama.tags || apiDrama.tagNames || apiDrama.tagV3s?.map((tag) => tag.tagName) || [],
    views: apiDrama.playCount,
    totalEpisodes: apiDrama.chapterCount,
    // Keep original data for reference
    ...apiDrama,
  }
}

/**
 * Map API response ke format DramaDetail
 */
export function mapDramaBoxToDramaDetail(
  apiDrama: DramaBoxApiResponse
): DramaDetail {
  const drama = mapDramaBoxToDrama(apiDrama)
  return {
    ...drama,
    longDescription: apiDrama.introduction, // Use introduction as long description
    // Preserve original API fields
    shelfTime: apiDrama.shelfTime,
    bookShelfTime: apiDrama.bookShelfTime,
  }
}

/**
 * Map array of API responses
 */
export function mapDramaBoxArrayToDrama(
  apiDramas: DramaBoxApiResponse[]
): Drama[] {
  return apiDramas.map(mapDramaBoxToDrama)
}

