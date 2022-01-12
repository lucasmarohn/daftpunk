import { Box, Container, VStack, Stack, ButtonGroup, IconButton, Text } from '@chakra-ui/react'
import { FaApple, FaFacebook, FaInstagram, FaSoundcloud, FaSpotify, FaTwitter, FaYoutube } from 'react-icons/fa'

export const Footer = () => {
    return (
        <Box py={50}>
            <Container maxW="container.xl">
                <VStack>
                    <Stack direction="row">
                        <ButtonGroup variant="whiteAlpha" color="gray.500">
                            <IconButton aria-label="Facebook" icon={<FaFacebook />} />
                            <IconButton aria-label="Instagram" icon={<FaInstagram />} />
                            <IconButton aria-label="SoundCloud" icon={<FaSoundcloud />} />
                            <IconButton aria-label="Apple Music" icon={<FaApple />} />
                            <IconButton aria-label="Spotify" icon={<FaSpotify />} />
                            <IconButton aria-label="Twitter" icon={<FaTwitter />} />
                            <IconButton aria-label="YouTube" icon={<FaYoutube />} />
                        </ButtonGroup>
                    </Stack>
                    <Stack direction={['column', null, 'row']} textAlign="center" fontSize="xs" spacing={4} color="gray.500">
                        <Text>&copy; UNIVERSAL MUSIC GROUP</Text>
                        <Text>PRIVACY POLICY</Text>
                        <Text>TERMS &amp; CONDITIONS</Text>
                        <Text>DO NOT SELL MY PERSONAL INFORMATION</Text>
                    </Stack>
                </VStack>
            </Container>
        </Box>
    )
}