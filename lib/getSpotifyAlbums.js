
export const getSpotifyAlbums = async(accessToken, artistId, limit = 50, offset = 0) => {
    try {
        const albumQuery = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=${limit}&include_groups=album&offset=${offset}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        return albumQuery.json()
    } catch(e) {
        return {items: []}
    }

}