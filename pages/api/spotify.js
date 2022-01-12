import { getSpotifyAccessToken } from '../../lib/getSpotifyAccessToken'

export default async function handler(req, res) {
    const token = await getSpotifyAccessToken()
    res.status(200).json({token: token})
  }
  