import { Box, Container, VStack, SimpleGrid} from '@chakra-ui/react'
import Image from 'next/image'

export const Section = ({children, bgComponent, bgImage, maxW, ...props}) => {
    return (
        <SimpleGrid columns={1} row={1} pos="relative" {...props}>
            <Box py={[50, 100, 150]} w="100%" gridColumn={1} gridRow={1} zIndex={1}>
                <Container maxW={maxW ? maxW : "container.xl"}>
                    <VStack w="100%" align="left" spacing={12}>
                        {children}
                    </VStack>
                </Container>
            </Box>
            {bgImage && <Box gridColumn={1} gridRow={1}><Image src={bgImage} layout="fill" objectFit="cover" alt="" /></Box>}
            {bgComponent && 
                <Box overflow="hidden" maxW="100vw" position="relative" gridColumn={1} gridRow={1}>
                {bgComponent}
            </Box>}
        </SimpleGrid>
    )
}