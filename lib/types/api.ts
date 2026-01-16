// Types untuk DramaBox API Response

// Raw API Response dari DramaBox
export interface DramaBoxApiResponse {
    bookId: string
    bookName: string
    coverWap?: string
    cover?: string // Untuk search response
    chapterCount?: number
    introduction?: string
    tags?: string[]
    tagNames?: string[] // Untuk search response
    tagV3s?: Array<{
        tagId: number
        tagName: string
        tagEnName: string
    }>
    playCount?: string
    bookShelfTime?: number
    shelfTime?: string
    corner?: {
        cornerType: number
        name: string
        color: string
    }
    author?: string
    protagonist?: string
    [key: string]: unknown
}

// VIP API Response Structure
export interface DramaBoxVipApiResponse {
    bannerList: unknown[]
    watchHistory: unknown[]
    columnVoList: Array<{
        columnId: number
        title: string
        subTitle: string
        style: string
        bookList: DramaBoxApiResponse[]
        type: number
    }>
    recommendList: {
        current: number
        size: number
        total: number
        records: unknown[]
        pages: number
    }
    newTheaterList: {
        current: number
        size: number
        total: number
        records: unknown[]
        pages: number
    }
    cornerSwitch: boolean
    reserveChannelFlag: boolean
    isAlgorithmBanner: number
}

// Normalized Drama interface untuk aplikasi
export interface Drama {
    id: string
    title: string
    description?: string
    thumbnail?: string
    poster?: string
    rating?: number
    year?: number
    genre?: string[]
    views?: string
    duration?: string
    totalEpisodes?: number
    cast?: string[]
    director?: string
    status?: string
    [key: string]: unknown // Untuk field tambahan dari API
}

// Raw API Response untuk Episode
export interface DramaBoxEpisodeApiResponse {
    chapterId: string
    chapterIndex: number
    chapterName: string
    chapterImg?: string
    cdnList?: Array<{
        cdnDomain: string
        isDefault: number
        videoPathList: Array<{
            quality: number
            videoPath: string
            isDefault: number
            isEntry: number
            isVipEquity: number
        }>
    }>
    chapterType?: number
    isCharge?: number
    needInterstitialAd?: number
    viewingDuration?: number
    spriteSnapshotUrl?: string
    chargeChapter?: boolean
    [key: string]: unknown
}

// Normalized Episode interface untuk aplikasi
export interface Episode {
    id: string
    number: number
    title: string
    duration?: string
    thumbnail?: string
    videoUrl?: string
    videoUrls?: {
        quality: number
        url: string
        isVip?: boolean
    }[]
    isWatched?: boolean
    isCharge?: boolean
    [key: string]: unknown
}

export interface DramaDetail extends Drama {
    longDescription?: string
    episodes?: Episode[]
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total?: number
    page?: number
    limit?: number
    hasMore?: boolean
}

// Search parameters
export interface SearchParams {
    query: string
    page?: number
    limit?: number
}

// Detail parameters
export interface DetailParams {
    id: string
}

