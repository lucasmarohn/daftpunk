
export const getSpotifyTopTracks = async(accessToken, artistId, limit = 50, offset = 0) => {
    try {
        const query = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        return query.json()
    } catch(e) {
        return {items: []}
    }

}