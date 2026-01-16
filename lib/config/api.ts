// API Configuration

export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://dramabox.sansekai.my.id/api",
    timeout: 30000, // 30 seconds
    retries: 3,
}

// API Endpoints
export const API_ENDPOINTS = {
    // Drama endpoints
    vip: "/dramabox/vip",
    dubindo: "/dramabox/dubindo",
    randomDrama: "/dramabox/randomdrama",
    forYou: "/dramabox/foryou",
    latest: "/dramabox/latest",
    trending: "/dramabox/trending",
    popularSearch: "/dramabox/populersearch",
    search: "/dramabox/search",
    detail: "/dramabox/detail",
    allEpisode: "/dramabox/allepisode",
} as const

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS]

