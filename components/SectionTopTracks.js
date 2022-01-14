
import { Box, Heading, SimpleGrid, VStack, HStack, Text } from "@chakra-ui/react"
import { Section } from './Section'
import { getLinearTransform } from "../lib/getLinearTransform"

// Please include one visualization/graph using any of the API’s previously mentioned
export const SectionTopTracks = ({topTracks}) => {

    const getYearFromTrack = (track) => {
        return parseInt(track.album.release_date.split('-')[0])
    }

    // Sort by date, rather than rating
    // so that the visual looks more interesting
    const trackList = topTracks.tracks.sort((a, b) => {
        return getYearFromTrack(a) - getYearFromTrack(b)
    })


    // Get range of popularity
    // We'll use these in the Linear Transform equation getLinearTransform()
    // so we can relatively increase/stretch the visual difference in ratings
    let maxPopularity = trackList[0].popularity
    let minPopularity = trackList[0].popularity

    trackList.forEach(track => {
        if(track.popularity > maxPopularity) maxPopularity = track.popularity
        if(track.popularity < minPopularity) minPopularity = track.popularity
    })
    
    return(
        <Section py={[0]} bgGradient="linear-gradient(to bottom, gray.900, transparent)">
            <VStack>
                <Heading variant="headline" as="h2">Top Tracks in the U.S.</Heading>
                <Heading>The People Have Listened</Heading>
            </VStack>
            <VStack color="white" className="hello" w="100%" align="left" spacing={1}>
                {trackList.map(track => {
                    // We determine the relative popularity each track has vs all other top tracks.
                    // We start from 60 so that tracks don't appear "unpopular", if we start at 0
                    // then the least popular of the top 10 will appear to have 0% popularity

                    // We place this value in a CSS custom property as a % so we can use CSS hover transitions
                    return (
                        <SimpleGrid 
                            key={track.name}
                            style={{"--popularity": `${getLinearTransform(track.popularity, minPopularity, maxPopularity, 60, 100)}%`}}
                            color="white" 
                            bg="gray.900"
                            role="group"
                            transition="background .2s ease-out"
                            _hover={{
                                bg: "red.900"
                            }}
                        >
                            <HStack gridColumn={1} gridRow={1} zIndex={1}  p={2} justify="space-between" w="100%">
                                <Text color="red.200">{getYearFromTrack(track)}</Text>
                                <Text>{track.name.split('(')[0]}</Text>
                                <Text color="red.200">{Math.round(track.popularity / maxPopularity * 100)}%</Text>
                            </HStack>
                            <Box 
                                margin="0 auto"
                                w="var(--popularity)"
                                bg="rgba(255,255,255,.05)"
                                gridColumn={1} 
                                gridRow={1}
                            />
                            <Box 
                                transform="scaleX(0)"
                                margin="0 auto"
                                transition="transform .5s ease-out"
                                w="var(--popularity)"
                                bg="red.500"
                                gridColumn={1} 
                                gridRow={1}
                                transitionDelay=".2s"
                                _groupHover={{
                                    transform: "scaleX(1)",
                                    transition: 'transform .2s ease-out',
                                    transitionDelay: 0
                                }} 
                            />
                        </SimpleGrid>
                    )}
                )}
            </VStack>
        
        </Section>
    )
}