# DramaBox API Client

Template untuk fetch ke API external DramaBox.

## Struktur

```
lib/
├── api/
│   ├── client.ts      # Base API client dengan retry logic
│   ├── dramabox.ts    # DramaBox service methods
│   └── server.ts      # Server-side functions untuk Server Components
├── config/
│   └── api.ts         # API configuration & endpoints
└── types/
    └── api.ts         # TypeScript types/interfaces
```

## Penggunaan

### 1. Server Components (Recommended untuk Next.js App Router)

```tsx
// app/page.tsx
import { getTrendingDramas, getLatestDramas } from "@/lib/api/server"

export default async function HomePage() {
  const trending = await getTrendingDramas()
  const latest = await getLatestDramas(1, 10)

  return (
    <div>
      {trending.map((drama) => (
        <div key={drama.id}>{drama.title}</div>
      ))}
    </div>
  )
}
```

### 2. Client Components dengan React Query

```tsx
// components/drama-list.tsx
"use client"

import { useTrending, useLatest } from "@/hooks/use-drama"

export function DramaList() {
  const { data: trending, isLoading } = useTrending()
  const { data: latest } = useLatest(1, 10)

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {trending?.map((drama) => (
        <div key={drama.id}>{drama.title}</div>
      ))}
    </div>
  )
}
```

### 3. Direct Service Call

```tsx
import { DramaBoxService } from "@/lib/api/dramabox"

// Di dalam async function atau useEffect
const dramas = await DramaBoxService.getTrending()
const detail = await DramaBoxService.getDetail({ id: "123" })
const episodes = await DramaBoxService.getAllEpisodes("123")
```

## Configuration

Set environment variable di `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://dramabox.sansekai.my.id/api
```

## Available Methods

### Server Functions (`lib/api/server.ts`)
- `getTrendingDramas()` - Get trending dramas
- `getLatestDramas(page?, limit?)` - Get latest dramas
- `getForYouDramas()` - Get recommendations
- `getDramaDetail(id)` - Get drama detail
- `getDramaEpisodes(dramaId)` - Get all episodes
- `searchDramas(params)` - Search dramas
- `getVipDramas()` - Get VIP dramas
- `getRandomDrama()` - Get random drama

### Service Methods (`lib/api/dramabox.ts`)
- `DramaBoxService.getTrending()`
- `DramaBoxService.getLatest()`
- `DramaBoxService.getDetail()`
- `DramaBoxService.getAllEpisodes()`
- `DramaBoxService.search()`
- Dan lainnya...

### React Query Hooks (`hooks/use-drama.ts`)
- `useTrending()`
- `useLatest(page?, limit?)`
- `useForYou()`
- `useDramaDetail(id)`
- `useEpisodes(dramaId)`
- `useSearchDramas(params)`
- `useVip()`
- `useRandomDrama()`

## Error Handling

Semua functions sudah include error handling. Jika terjadi error, akan return empty array atau null.

Untuk custom error handling:

```tsx
try {
  const drama = await getDramaDetail("123")
} catch (error) {
  if (error instanceof ApiError) {
    console.error("API Error:", error.message, error.status)
  }
}
```

## TypeScript Types

Semua types tersedia di `lib/types/api.ts`:
- `Drama` - Drama object
- `DramaDetail` - Drama dengan detail lengkap
- `Episode` - Episode object
- `ApiResponse<T>` - Generic API response
- `PaginatedResponse<T>` - Paginated response
- `SearchParams` - Search parameters

