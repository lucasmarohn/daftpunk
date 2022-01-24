import { btoa } from 'js-base64'

export const getSpotifyAccessToken = async() => {
    try {
        const CLIENT_ID = process.env.SPOTIFY_API_CLIENT_ID
        const CLIENT_SECRET = process.env.SHOPIFY_API_CLIENT_SECRET
    
        const basicAuth = btoa(CLIENT_ID + ":" + CLIENT_SECRET)
        const query = await fetch('https://accounts.spotify.com/api/token?grant_type=client_credentials', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + basicAuth
            },
        })
        
        const data = await query.json()
        console.log('data', data)
        return data.access_token
    } catch(e) {
        return null
    }
    
}