import { useState } from "react"
import { Box, SimpleGrid, Heading, Stack, VStack, HStack, Text, Button, AspectRatio } from "@chakra-ui/react"
import Image from 'next/image'
import { Section } from './Section'
import { MovingGrid } from "./MovingGrid"
import { FaSpinner } from "react-icons/fa"

// A “Merch” section showcasing 1-4 products (can use dummy/static data)
// Include an option to filter the product for one of the sections (this option should use a React hook to conditionally call one of the suggested API endpoints).

export const SectionProducts = ({ initialCollections, initialProducts }) => {
    const [products, setProducts] = useState(initialProducts)
    const [activeCollectionId, setActiveCollectionId] = useState(initialCollections[0]?.id)
    const [isLoading, setIsLoading] = useState(false)

    const loadCollectionProductsById = async(collectionId) => {
        setIsLoading(true)
        setActiveCollectionId(collectionId)
        const collectionData = await fetch('/api/shopify?id=' + collectionId)
        const products = await collectionData.json()
        setProducts(products)
        setIsLoading(false)
    }

    return (
        <Section bgComponent={<MovingGrid direction={-1} color="#2D3748"/>}>
            <VStack>
                <Heading variant="headline" textAlign="center">Represent Daft Punk</Heading>
                <Heading textAlign="center" as="h2">Official Daft Punk Dog Collars</Heading>
            </VStack>

            <SimpleGrid columns={[2, 2, 4]} gap={8}>
                {products?.length > 0 && products.map(product => {
                    return (
                        <VStack key={product.id} align="left">
                            {product.images.length > 0 && 
                                <Box bg="gray.800">
                                    <AspectRatio ratio={1} bg="gray.100">
                                        {isLoading ? <Box animation="spin 1s linear infinite" color="gray.500"><FaSpinner fontSize={48} /></Box> : <Image 
                                        alt="" 
                                        src={product.images[0].src}
                                        layout="fill" />}
                                    </AspectRatio>
                                </Box>
                            }
                            <Stack direction={['column', 'row']}align="start" w="100%" justifyContent="space-between">
                            <Text size="sm">{isLoading ? "Loading Product" : product.title}</Text>
                            {isLoading ? null : <Text color="gray.400">$30</Text>}
                            </Stack>
                        </VStack>
                    )
                })}
            </SimpleGrid>

            <VStack>
                <Stack direction={['column', 'column', 'row']} flexWrap="wrap" align="center" justify="center" mx="auto">
                    {initialCollections.map(collection => 
                        <Button 
                            colorScheme="whiteAlpha"
                            aria-label={`View ${collection.title}`} key={collection.id} 
                            disabled={collection.id === activeCollectionId} 
                            onClick={() => loadCollectionProductsById(collection.id)}>{collection.title}</Button>
                    )}
                </Stack>
            </VStack>
    </Section>
    )
}