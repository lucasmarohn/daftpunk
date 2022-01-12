import { useState } from "react"
import { Box, SimpleGrid, Heading, VStack, Modal, ModalBody, AspectRatio, CloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import Image from 'next/image'
import { Section } from "./Section"

// A “Video” section that displays the Top 3 Youtube videos by views

export const SectionVideo = ({apiKey, channelId, videoData}) => {
    const videoMax = 3
    const [videos, setVideos] = useState(videoData.items)
    const [selectedVideo, setSelectedVideo] = useState({})
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
        <Section bgGradient="linear(to top, gray.900, transparent)">
            <VStack>
                <Heading variant="headline">Watch Along</Heading>
                <Heading>Fan Favorite Videos</Heading>
            </VStack>

            {videos?.length > 0 && <SimpleGrid columns={[1, 2]} gap={8} alignItems="start"> 
                {videos.map((video, i) => {
                    let col = null;
                    let rowStart = null;
                    let rowEnd = null;
                    switch(i) {
                        case 0: 
                            col = 1;
                            rowStart = [null, 1]
                            rowEnd = [null, 3]
                            break;
                        case 1: 
                            col = [1, 2];
                            rowStart = [null, 2]
                            rowEnd = [null, 5]
                            break;
                        case 2: 
                            col = 1;
                            rowStart = [null, 4]
                            rowEnd = [null, 6]
                            break;
                    }
                    return (
                    <Box as="button" textAlign="left" 
                        aria-label={`Watch ${video.snippet.title}`}
                        gridColumn={col}
                        gridRowStart={rowStart}
                        gridRowEnd={rowEnd}
                        key={video.id.videoId}>
                        <VStack 
                        align="left" w="100%" 
                        onClick={() => {
                            setSelectedVideo({
                            embedId: video.id.videoId,
                            title: video.snippet.title
                            })
                            onOpen()
                        }}>
                            <Box bg="gray.800" w="100%" overflow="hidden" mb={4}>
                                <AspectRatio ratio={16 / 9}
                                transition="transform .2s ease-out"
                                _hover={{
                                    transform: "scale(1.01)"
                                }}>
                                    <Image alt="" src={video.snippet.thumbnails.high.url} layout="fill" objectFit="cover" />
                                </AspectRatio>
                            </Box>
                            <Heading variant="headline">{video.snippet.publishTime.split('-')[0]}</Heading>
                            <Heading size="md" lineHeight="lg">{video.snippet.title}</Heading>
                        </VStack>
                    </Box>
                    )}
                )}
            </SimpleGrid>}
        </Section>

        {selectedVideo.embedId && 
            <Modal size="4xl" maxW="100%" w="100%" isCentered isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="transparent">
                    <ModalBody w="100%" py={4} pb={0} paddingX={0} display="flex" flexDirection="column" justifyContent="center" alignContent="flex-end">
                        <CloseButton 
                        alignSelf="flex-end"
                        bg="black" 
                        m={4}
                        onClick={()=> {
                            setSelectedVideo({})
                            onClose()
                        }} />
                        <AspectRatio ratio={16 / 9} w="100%" bg="gray.900">
                        <Box as="iframe" 
                            width="100%"
                            frameBorder={0}
                            allow="autoplay"
                            allowFullScreen
                            src={`https://www.youtube.com/embed/${selectedVideo.embedId}`}
                            title={selectedVideo.title}
                        />
                        </AspectRatio>
                    </ModalBody>
                </ModalContent>
            </Modal>
        }
    </>
    )
}