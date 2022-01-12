import { Box, Heading, HStack, VStack, SimpleGrid, Text, AspectRatio, Button } from "@chakra-ui/react"
import Image from 'next/image'
import { Section } from './Section'
import { tourDates } from '../data/tourDates'
import { MovingGrid } from "./MovingGrid"


export const SectionTour = () => {
    return (
        <Section bgComponent={<MovingGrid color="#2D3748" />}>
            <VStack>
                <Heading variant="headline">Join Us</Heading>
                <Heading>Daft Punk World Tour 2026</Heading>
            </VStack>

            <SimpleGrid columns={[1, 1, 1, 2]} gap={12}>
                <AspectRatio w="100%" ratio={1}>
                    <Box>
                        <Image alt="Daft Punk performing live" src="/images/live.jpg" layout="fill" objectFit="cover" />
                    </Box>
                </AspectRatio>
                
                <VStack w="100%" align="space-between" spacing={0}>
                    <Heading mb={6} size="md">Tour Dates</Heading>
                    {tourDates.map(item => {
                        return (
                        <HStack 
                            key={item.id} 
                            color="white" 
                            align="start" 
                            spacing={8}
                            p={4}
                            border="1px solid transparent"
                            transition={"background .2s ease-out, border-color .3s ease-out"}
                            _hover={{
                                bg: 'black',
                                borderColor: 'red.500'
                            }}
                        > 
                            <Box color="red.500">{item.date.split('-').join(".")}</Box>
                            <VStack align="left" flexGrow={1}>
                                <Text>{item.venue}</Text>
                                <Text color="whiteAlpha.700">{item.location}</Text>
                            </VStack>
                            <Button 
                                aria-label={`RSVP to ${item.location} show on ${item.date}`} 
                                colorScheme="whiteAlpha" alignSelf="center">RSVP</Button>
                        </HStack>)
                    })}
                </VStack>
            </SimpleGrid>
        </Section>
    )
}