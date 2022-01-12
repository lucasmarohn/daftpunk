import React from 'react'
import { Box, Container, SimpleGrid, VStack, AspectRatio, Button, HStack, Text } from "@chakra-ui/react"
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { FaApple, FaSpotify } from 'react-icons/fa'

// A promotional banner advertising a new single

export const SectionBanner = ({}) => {

    // Place all items in a 1x1 grid so they overlap

    return (
        <SimpleGrid alignItems="end" justifyItems="center" maxW="100%">
            {/* Scrolling Banner */}
            <Box w="100%" gridColumn={1} gridRow={1} zIndex={1} alignSelf="start" style={{animation: "fadeIn .5s ease-out backwards", animationDelay: ".5s"}}>
                <SimpleGrid columns={1} rows={1} alignItems="center" justifyItems="center">
                    <Box gridColumn={1} gridRow={1} zIndex={1} w="100%" maxW="500px" textAlign="center" filter="drop-shadow(0 0 30px #000000)" bgGradient="radial(farthest-side, rgba(0,0,0,1), rgba(0,0,0,.1), transparent)">
                        <Image src="/images/logo.png" alt="Daft Punk" width={200} height={131} objectFit="contain" priority />
                    </Box>

                    <Box gridColumn={1} gridRow={1} maxW="100vw" overflow="hidden" zIndex={0}>
                        <Marquee gradient={false}>
                            {new Array(10).fill("").map((_, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <Box flexShrink="0" mr={8} color="red.800" aria-hidden={i > 0}>NEW SINGLE OUT NOW</Box>
                                        <Box flexShrink="0" mr={8} color="red.500" aria-hidden={i > 0}>REVOLUTION</Box>
                                    </React.Fragment>
                                )}
                            )}
                        </Marquee>     
                    </Box>
                    
                </SimpleGrid>
            </Box>

            {/* Banner Content */}
            <Box gridColumn={1} gridRow={1} zIndex={1}>
                <Container maxW="container.lg" style={{animation: "fadeIn .5s ease-out backwards", animationDelay: "1.5s"}}>
                    <VStack color="white" spacing={0} pb={"7.5vh"}>
                        <Box size="md" textTransform="uppercase" letterSpacing=".4rem" overflow="hidden">
                            <Text style={{ animation: "fadeUpIn 1s ease-out backwards", animationDelay: "1.5s" }}>New Single. Out Now</Text>
                        </Box>

                        <Box overflow="hidden">
                            <Box style={{animation: "fadeUpIn .75s ease-out backwards", animationDelay: "2.25s" }}>
                                <Image src="/images/revolution.png" width={820} height={230} objectFit="contain" alt=""  />
                            </Box>
                        </Box>
                        
                        <Box style={{ animation: 'fadeIn 1s ease-out backwards 3s' }}>
                            <HStack spacing={4}>
                                <Button leftIcon={<FaSpotify />} variant="party" className="danceGlow">Spotify</Button>
                                <Button leftIcon={<FaApple />}  variant="party" className="danceGlow">Apple Music</Button>
                            </HStack>
                        </Box>
                    </VStack>
                </Container>
           </Box>

           {/* Background Image and Gradients */}
           <Box gridColumn={1} gridRow={1} w="100%" zIndex={0}>
                <AspectRatio ratio={16 / 9} w="100%" minH="var(--app-height)" position="relative">
                    <Box>
                        <Box bgGradient="linear-gradient(black, transparent)" w="100%" h="200px" zIndex="1" marginBottom="auto" position="absolute" inset="0" />
                        <Box bgGradient="linear-gradient(transparent, black)" w="100%" h="50vh" zIndex="1" marginTop="auto" position="absolute" inset="0" />
                        <Box w="100%" h="100%" 
                        position="relative"
                        style={{
                            animation: 'fadeInZoomOut 1s ease-in-out', 
                            animationDelay: ".5s", 
                            animationFillMode: "backwards"
                        }}><Image src="/images/daftpunk.jpg" layout="fill" alt="" objectFit="cover" priority /></Box>
                    </Box>
                </AspectRatio>
            </Box>
        </SimpleGrid>
    )
}