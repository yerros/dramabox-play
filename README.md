# DramaBox

A modern web application for streaming and browsing drama content, built with Next.js and TypeScript.

## Features

- 🎬 **Homepage** - Featured, trending, continue watching, and recommended dramas
- 📺 **Video Player** - Portrait-mode video playback using Vidstack
- 🔍 **Search** - Search dramas by title
- 📂 **Categories** - Browse by VIP, Dubindo, Random, For You, Latest, Trending, and Popular Search
- 📄 **Pagination** - Load more functionality for drama lists
- 📱 **Responsive Design** - Optimized for mobile and desktop

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Video Player**: Vidstack
- **UI Components**: Radix UI, Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_API_URL=https://dramabox.sansekai.my.id/api
```

If not set, the default API URL will be used.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── search/            # Search page
│   ├── category/          # Category pages
│   └── details/            # Drama detail & episode pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── video-player.tsx   # Vidstack video player
│   └── ...
├── lib/                    # Utilities and configurations
│   ├── api/               # API client and services
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
└── hooks/                  # Custom React hooks
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

This application uses an **external API service** hosted at `https://dramabox.sansekai.my.id/api`. All API endpoints are configured in `lib/config/api.ts`.

### Important Notes

- The application requires internet connection to access the external API
- All data (dramas, episodes, video URLs) are fetched from the external API
- The API base URL can be configured via the `NEXT_PUBLIC_API_URL` environment variable
- Default API URL: `https://dramabox.sansekai.my.id/api`

## License

Private project.
