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
    const queryParams: Record<string, string | number> = {}
    if (params?.page !== undefined) {
      queryParams.page = params.page
    }
    return apiClient.get<DramaBoxVipApiResponse>(API_ENDPOINTS.vip, queryParams)
  }

  // Get Indonesian dubbed dramas
  static async getDubindo(params?: {
    classify?: string
    page?: number
  }): Promise<DramaBoxApiResponse[]> {
    const queryParams: Record<string, string | number> = {}
    if (params?.classify !== undefined) {
      queryParams.classify = params.classify
    }
    if (params?.page !== undefined) {
      queryParams.page = params.page
    }
    return apiClient.get<DramaBoxApiResponse[]>(API_ENDPOINTS.dubindo, queryParams)
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
    const queryParams: Record<string, string | number> = {}
    if (params?.page !== undefined) {
      queryParams.page = params.page
    }
    if (params?.limit !== undefined) {
      queryParams.limit = params.limit
    }
    return apiClient.get<Drama[] | PaginatedResponse<Drama>>(
      API_ENDPOINTS.latest,
      queryParams
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
    const queryParams: Record<string, string | number> = {
      query: params.query,
    }
    if (params.page !== undefined) {
      queryParams.page = params.page
    }
    if (params.limit !== undefined) {
      queryParams.limit = params.limit
    }
    return apiClient.get<Drama[] | PaginatedResponse<Drama>>(
      API_ENDPOINTS.search,
      queryParams
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

