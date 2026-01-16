"use client"

import { MediaPlayer, MediaProvider } from "@vidstack/react"
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default"
import "@vidstack/react/player/styles/default/theme.css"
import "@vidstack/react/player/styles/default/layouts/video.css"
import { useEffect, useState } from "react"

interface VideoPlayerProps {
    src: string
    videoUrls?: Array<{
        quality: number
        url: string
        isVip?: boolean
    }>
    title?: string
    poster?: string
}

export function VideoPlayer({
    src,
    videoUrls,
    title,
    poster,
}: VideoPlayerProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || !src) {
        return (
            <div className="aspect-2/3 w-full max-w-md mx-auto bg-black flex items-center justify-center rounded-lg">
                <p className="text-white">Loading player...</p>
            </div>
        )
    }

    // Get best quality video URL (prefer non-VIP, 720p or highest quality)
    const getBestVideoUrl = () => {
        if (!videoUrls || videoUrls.length === 0) return src

        // Prefer 720p non-VIP
        const preferred = videoUrls.find(
            (v) => v.quality === 720 && !v.isVip
        ) || videoUrls.find((v) => !v.isVip) || videoUrls[0]

        return preferred.url
    }

    const videoSrc = getBestVideoUrl()

    return (
        <div className="w-full aspect-2/3 max-w-md mx-auto bg-black rounded-lg overflow-hidden">
            <MediaPlayer
                title={title}
                src={videoSrc}
                poster={poster}
                aspectRatio="2/3"
                load="eager"
                playsinline
                className="w-full h-full"
            >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
        </div>
    )
}

