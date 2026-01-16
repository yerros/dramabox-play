import { API_CONFIG, API_ENDPOINTS, type ApiEndpoint } from "@/lib/config/api"
import type { ApiResponse } from "@/lib/types/api"

// Custom error class untuk API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// Fetch wrapper dengan error handling dan retry logic
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = API_CONFIG.retries
): Promise<Response> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      )
    }

    return response
  } catch (error) {
    if (retries > 0 && error instanceof Error && error.name !== "AbortError") {
      // Retry dengan exponential backoff
      await new Promise((resolve) => setTimeout(resolve, 1000 * (API_CONFIG.retries - retries + 1)))
      return fetchWithRetry(url, options, retries - 1)
    }
    throw error
  }
}

// Base API client
export class ApiClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_CONFIG.baseUrl
  }

  // Generic GET request
  async get<T>(
    endpoint: ApiEndpoint | string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    // Add query parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const response = await fetchWithRetry(url.toString(), {
      method: "GET",
    })

    const data = await response.json()

    // Handle API response format
    if (data.success === false || data.error) {
      throw new ApiError(
        data.message || data.error || "Unknown error",
        response.status,
        data
      )
    }

    // Return data directly or from data property
    return (data.data !== undefined ? data.data : data) as T
  }

  // Generic POST request
  async post<T>(
    endpoint: ApiEndpoint | string,
    body?: unknown
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    const response = await fetchWithRetry(url.toString(), {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    if (data.success === false || data.error) {
      throw new ApiError(
        data.message || data.error || "Unknown error",
        response.status,
        data
      )
    }

    return (data.data !== undefined ? data.data : data) as T
  }
}

// Default API client instance
export const apiClient = new ApiClient()

