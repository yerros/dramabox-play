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
  DramaBoxVipApiResponse,
} from "@/lib/types/api"

// DramaBox API Service
export class DramaBoxService {
  // Get VIP dramas
  static async getVip(params?: { page?: number }): Promise<DramaBoxVipApiResponse> {
    return apiClient.get<DramaBoxVipApiResponse>(API_ENDPOINTS.vip, {
      page: params?.page,
    })
  }

  // Get Indonesian dubbed dramas
  static async getDubindo(params?: {
    classify?: string
    page?: number
  }): Promise<DramaBoxApiResponse[]> {
    return apiClient.get<DramaBoxApiResponse[]>(API_ENDPOINTS.dubindo, {
      classify: params?.classify,
      page: params?.page,
    })
  }

  // Get random drama
  static async getRandomDrama(): Promise<Drama> {
    return apiClient.get<Drama>(API_ENDPOINTS.randomDrama)
  }

  // Get "For You" recommendations
  static async getForYou(): Promise<Drama[]> {
    return apiClient.get<Drama[]>(API_ENDPOINTS.forYou)
  }

  // Get latest dramas
  static async getLatest(params?: { page?: number; limit?: number }): Promise<Drama[] | PaginatedResponse<Drama>> {
    return apiClient.get<Drama[] | PaginatedResponse<Drama>>(
      API_ENDPOINTS.latest,
      params
    )
  }

  // Get trending dramas
  static async getTrending(): Promise<Drama[]> {
    return apiClient.get<Drama[]>(API_ENDPOINTS.trending)
  }

  // Get popular searches
  static async getPopularSearch(): Promise<string[]> {
    return apiClient.get<string[]>(API_ENDPOINTS.popularSearch)
  }

  // Search dramas
  static async search(params: SearchParams): Promise<Drama[] | PaginatedResponse<Drama>> {
    return apiClient.get<Drama[] | PaginatedResponse<Drama>>(
      API_ENDPOINTS.search,
      {
        query: params.query,
        page: params.page,
        limit: params.limit,
      }
    )
  }

  // Get drama detail
  static async getDetail(params: DetailParams): Promise<DramaBoxApiResponse> {
    return apiClient.get<DramaBoxApiResponse>(API_ENDPOINTS.detail, {
      bookId: params.id,
    })
  }

  // Get all episodes for a drama
  static async getAllEpisodes(dramaId: string): Promise<Episode[]> {
    return apiClient.get<Episode[]>(API_ENDPOINTS.allEpisode, {
      bookId: dramaId,
    })
  }
}

