import { useEffect, useState } from 'react'
import { Box, SimpleGrid, Grid, IconButton, Divider, Heading, VStack, HStack, Text, useDisclosure, Modal, ModalContent, ModalOverlay, ModalBody } from "@chakra-ui/react"
import Image from 'next/image'
import { Section } from './Section'
import { FaAngleLeft, FaAngleRight, FaSpinner } from 'react-icons/fa'
import { getSpotifyAlbums } from '../lib/getSpotifyAlbums'

// A “Music” section (not required to have working audio playback). Can display anything 
export const SectionAlbums = ({albums, albumsQuery, accessToken, artistId}) => {
    const maxVideos = albums.length || 4
    const [totalAlbums, setTotalAlbums] = useState(albumsQuery.total)
    const [offset, setOffset] = useState(0)
    const [hasNextPage, setHasNextPage] = useState(albumsQuery.total > albumsQuery.offset + albums.length)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [albumsList, setAlbumsList] = useState(albums)
    const [selectedAlbumId, setSelectedAlbumId] = useState(null)
    const [selectedAlbum, setSelectedAlbum] = useState({})
    const [albumDetails, setAlbumDetails] = useState({})
    const {isOpen, onOpen, onClose} = useDisclosure()
    
    useEffect(() => {
    
        const fetchAlbumTracks = async() => {
            let albumItems = []
            let token = localStorage.getItem('spotifyAccessToken') || null
            let expires = localStorage.getItem('spotifyAccessTokenExpires') || 0

            if(selectedAlbumId !== null) {
                setIsLoading(true)
                // If there is no token in localstorage or the token is over an hour old
                // get a new token
                if( !token || expires < Date.now() - 1000 * 60 * 60 ) {
                    const tokenQuery = await fetch('/api/spotify')
                    const tokenData = await tokenQuery.json()
                    localStorage.setItem('spotifyAccessToken', tokenData.token)
                    localStorage.setItem('spotifyAccessTokenExpires', Date.now())
                }
                const albumQuery = await fetch(`https://api.spotify.com/v1/albums/${selectedAlbumId}/tracks`, {
                    headers: {
                    'Authorization': `Bearer ${localStorage.getItem('spotifyAccessToken')}`,
                    'Content-Type': 'application/json'
                    }
                })
                const albumData = await albumQuery.json()
                albumItems = albumData.items
                setIsLoading(false)
            }
            setAlbumDetails(albumItems)
        }
        fetchAlbumTracks()
        
    }, [selectedAlbumId, accessToken])

    const getNextPage = async() => {
        let newItems = [...albumsList]
        const newOffset = offset += maxVideos
        const data = await getSpotifyAlbums(accessToken, artistId, maxVideos, newOffset)
        
        // If there are less than 4 albums returned e.g. on the last page
        // We'll keep some of the previous items in the array
        // So that there are always 4 items
        if(data.items.length < maxVideos) {
            const numberOfItemsToShift = maxVideos + data.items.length - maxVideos
            for(let i = 0; i < numberOfItemsToShift; i++) {
                newItems.shift()
                newItems.push(data.items[i])
            }
        } else {
            newItems = data.items
        }

        // Set our state
        setAlbumsList(data.items.length > 0 ? newItems : albumsList)
        setOffset(newOffset)
        setTotalAlbums(data.total)
    }

    const getPrevPage = async() => {
        let items = [...albumsList]

        // Make sure we don't use a negative offset
        const newOffset = offset - maxVideos > 0 ? offset - maxVideos : 0
        const data = await getSpotifyAlbums(accessToken, artistId, maxVideos, newOffset)
        items = data.items
        
        // Set our state
        setAlbumsList(items)
        setOffset(newOffset)
        setTotalAlbums(data.total)
    }

    useEffect(()=>{
        setHasPrevPage(offset !== 0)
        setHasNextPage(albumsList.length + offset < totalAlbums)
    }, [offset, albumsList, totalAlbums])

    if(!albums?.length > 0) return null
    return(
        <>
        <Section>
            <VStack>
                <Heading variant="headline">Discography</Heading>
                <Heading>A Look Back in Time</Heading>
            </VStack>
            <Grid templateColumns="44px 1fr 44px" templateRows="100%" gap={4} alignItems="center" w="100%">
            <IconButton aria-label="Load Newer Albums" disabled={!hasPrevPage} icon={<FaAngleLeft />} color="white" colorScheme="whiteAlpha" onClick={()=>getPrevPage()} />
                <SimpleGrid columns={[2,2, 4]} gap={8} w="100%" alignItems="start"> 
                {albumsList?.length > 0 && albumsList.map(album => {
                    const albumImage = album?.images?.length > 0 ? album.images[0] : null
                    const albumUri = album.uri.split(":")
                    const albumId = albumUri[albumUri.length - 1]
                    return (
                        <Box role="group" as="button" aria-label={`View ${album.name} Tracks`} display="block" textAlign="left" w="100%" key={album.uri} >
                        <VStack 
                            w="100%" 
                            align="left" 
                            cursor="pointer"
                            onClick={()=> {
                                setSelectedAlbumId(albumId); 
                                setSelectedAlbum({
                                    image: albumImage,
                                    name: album.name,
                                    releaseDate: album.release_date
                                })
                                onOpen();
                            }}
                        >
                        {albumImage && 
                            <Box overflow="hidden" mb={4}>
                                <Box transition="transform .2s ease-out"
                                    _groupHover={{
                                        transform: "scale(1.02)"
                                    }}>
                                        <Image alt="" src={albumImage.url} width={albumImage.width} height={albumImage.height} layout="responsive" />
                                </Box>
                            </Box>}

                            <Heading variant="headline" fontSize="xs">{album.release_date.split('-')[0]}</Heading>
                            <Heading size="sm">{album.name}</Heading>
                        </VStack>
                        </Box>
                    )}
                )}
                </SimpleGrid>
                <IconButton aria-label="Load Older Albums" disabled={!hasNextPage} icon={<FaAngleRight />} color="white" colorScheme="whiteAlpha" 
                onClick={()=>getNextPage()}
                />
            </Grid>
        </Section>
        {selectedAlbumId && 
        <Modal size="lg" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <ModalOverlay />
           
            <ModalContent>
                {selectedAlbum.image && 
                    <Box>
                        <Image alt="" src={selectedAlbum.image.url} width={selectedAlbum.image.width} height={selectedAlbum.image.height} layout="responsive" />
                    </Box>
                }
                <VStack align="left" p={6}>
                    <Heading variant="headline">{selectedAlbum.releaseDate.split('-')[0]}</Heading>
                    <Heading size="lg">{selectedAlbum.name}</Heading>
                </VStack>

                <ModalBody pb={5}>
                    <VStack align="left" divider={<Divider/>}>
                    {albumDetails && albumDetails.map(details => {
                        return (
                            <HStack key={details.id} justifyContent="space-between">
                                {isLoading ? <Box textAlign="center" mx="auto" animation="spin 1s linear infinite"><FaSpinner /></Box> : <><Text size="sm">{details.name}</Text>
                                <Text size="xs">{(Math.round(details.duration_ms * .1 / 60) / 100).toString().replace('.',':')}</Text></>}
                            </HStack>
                        )
                    })}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>}
        </>
    )
}
