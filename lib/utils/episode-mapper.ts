import type { Episode, DramaBoxEpisodeApiResponse } from "@/lib/types/api"

/**
 * Map API episode response ke format Episode yang digunakan aplikasi
 */
export function mapDramaBoxEpisodeToEpisode(
  apiEpisode: DramaBoxEpisodeApiResponse,
  index: number
): Episode {
  // Extract video URLs from cdnList
  const videoUrls: Episode["videoUrls"] = []
  
  if (apiEpisode.cdnList && apiEpisode.cdnList.length > 0) {
    // Use default CDN or first CDN
    const defaultCdn = apiEpisode.cdnList.find((cdn) => cdn.isDefault === 1) || apiEpisode.cdnList[0]
    
    if (defaultCdn?.videoPathList) {
      defaultCdn.videoPathList.forEach((video) => {
        videoUrls.push({
          quality: video.quality,
          url: video.videoPath,
          isVip: video.isVipEquity === 1,
        })
      })
    }
  }

  // Get default video URL (720p or first available)
  const defaultVideo = videoUrls.find((v) => v.quality === 720) || videoUrls.find((v) => !v.isVip) || videoUrls[0]

  // Extract episode number from chapterName (e.g., "EP 1" -> 1)
  const episodeNumber = apiEpisode.chapterIndex !== undefined 
    ? apiEpisode.chapterIndex + 1 
    : parseInt(apiEpisode.chapterName?.replace(/\D/g, "") || String(index + 1), 10) || index + 1

  // Determine isCharge value - convert to boolean
  const isChargeValue: boolean | undefined = 
    apiEpisode.isCharge === 1 || apiEpisode.chargeChapter === true
      ? true
      : apiEpisode.isCharge === 0 || apiEpisode.chargeChapter === false
      ? false
      : undefined

  // Create base object without isCharge from spread
  const { isCharge: _, chargeChapter: __, ...restApiEpisode } = apiEpisode

  return {
    id: apiEpisode.chapterId,
    number: episodeNumber,
    title: apiEpisode.chapterName || `Episode ${episodeNumber}`,
    thumbnail: apiEpisode.chapterImg,
    videoUrl: defaultVideo?.url,
    videoUrls: videoUrls.length > 0 ? videoUrls : undefined,
    isCharge: isChargeValue,
    // Keep original data for reference (excluding isCharge and chargeChapter to avoid type conflicts)
    ...restApiEpisode,
  }
}

/**
 * Map array of API episode responses
 */
export function mapDramaBoxEpisodesToEpisodes(
  apiEpisodes: DramaBoxEpisodeApiResponse[]
): Episode[] {
  return apiEpisodes.map((ep, index) => mapDramaBoxEpisodeToEpisode(ep, index))
}

