import { staticVideoData } from "../data/videos"
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

export const getYoutubeVideos = async(YOUTUBE_CHANNEL_ID, count = 3) => {
    try {
        const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&q=daftpunk&maxResults=${count}&type=video&order=viewCount&channelId=${YOUTUBE_CHANNEL_ID}`
        const videoQuery = await fetch(endpoint)
        const videoData = await videoQuery.json()
        if(!videoData.items) {
          throw new Error(videoData.error?.message)
        }
        return videoData
    } catch(e) {
      console.error("VIDEO DATA", e)
      return { items: staticVideoData }
    }
}