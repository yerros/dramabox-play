"use client"

/**
 * React Query hooks untuk fetching drama data
 * 
 * INSTALASI:
 * npm install @tanstack/react-query
 * 
 * SETUP di app/layout.tsx:
 * ```tsx
 * import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
 * 
 * const queryClient = new QueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 5 * 60 * 1000, // 5 minutes
 *     },
 *   },
 * })
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <QueryClientProvider client={queryClient}>
 *           {children}
 *         </QueryClientProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */

// Uncomment setelah install @tanstack/react-query
// import { useQuery } from "@tanstack/react-query"
import { DramaBoxService } from "@/lib/api/dramabox"
import type { Drama, DramaDetail, Episode, SearchParams } from "@/lib/types/api"
import { useState, useEffect } from "react"

// Temporary fallback implementation
// TODO: Install @tanstack/react-query dan uncomment import di atas
function useQuery<T>({
    queryKey,
    queryFn,
    enabled = true,
    staleTime,
}: {
    queryKey: unknown[]
    queryFn: () => Promise<T>
    enabled?: boolean
    staleTime?: number
}) {
    const [data, setData] = useState<T | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!enabled) {
            setIsLoading(false)
            return
        }

        let cancelled = false
        setIsLoading(true)
        setError(null)

        queryFn()
            .then((result) => {
                if (!cancelled) {
                    setData(result)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err)
                    setIsLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryKey.join(","), enabled])

    return { data, isLoading, error }
}

// Get trending dramas
export function useTrending() {
    return useQuery({
        queryKey: ["dramas", "trending"],
        queryFn: () => DramaBoxService.getTrending(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

// Get latest dramas
export function useLatest(page?: number, limit?: number) {
    return useQuery({
        queryKey: ["dramas", "latest", page, limit],
        queryFn: () => DramaBoxService.getLatest({ page, limit }),
        staleTime: 5 * 60 * 1000,
    })
}

// Get "For You" recommendations
export function useForYou() {
    return useQuery({
        queryKey: ["dramas", "foryou"],
        queryFn: () => DramaBoxService.getForYou(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    })
}

// Get drama detail
export function useDramaDetail(id: string) {
    return useQuery({
        queryKey: ["drama", "detail", id],
        queryFn: () => DramaBoxService.getDetail({ id }),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    })
}

// Get all episodes
export function useEpisodes(dramaId: string) {
    return useQuery({
        queryKey: ["drama", "episodes", dramaId],
        queryFn: () => DramaBoxService.getAllEpisodes(dramaId),
        enabled: !!dramaId,
        staleTime: 10 * 60 * 1000,
    })
}

// Search dramas
export function useSearchDramas(params: SearchParams) {
    return useQuery({
        queryKey: ["dramas", "search", params.query, params.page],
        queryFn: () => DramaBoxService.search(params),
        enabled: !!params.query && params.query.length > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    })
}

// Get VIP dramas
export function useVip() {
    return useQuery({
        queryKey: ["dramas", "vip"],
        queryFn: () => DramaBoxService.getVip(),
        staleTime: 10 * 60 * 1000,
    })
}

// Get random drama
export function useRandomDrama() {
    return useQuery({
        queryKey: ["drama", "random"],
        queryFn: () => DramaBoxService.getRandomDrama(),
        staleTime: 5 * 60 * 1000,
    })
}

