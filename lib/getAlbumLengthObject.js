
export const getAlbumLengthObject = (albums) => {
    let list = []
    albums.forEach(album => {
        list.push({
            name: album.name,
            date: album.release_date,
            count: album.total_tracks,
        })
    })
    return list
}