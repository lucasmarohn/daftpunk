import { useState } from "react"
import { Box, SimpleGrid, Heading, VStack, HStack, Text, ButtonGroup, Button } from "@chakra-ui/react"
import Image from 'next/image'
import { Section } from './Section'
import { MovingGrid } from "./MovingGrid"

// Include an option to filter the product for one of the sections (this option should use a React hook to conditionally call one of the suggested API endpoints).

export const SectionProducts = ({ initialCollections, initialProducts }) => {
    const [products, setProducts] = useState(initialProducts)
    const [activeCollectionId, setActiveCollectionId] = useState(initialCollections[0]?.id)

    const loadCollectionProductsById = async(collectionId) => {
        setActiveCollectionId(collectionId)
        const collectionData = await fetch('/api/shopify?id=' + collectionId)
        const products = await collectionData.json()
        setProducts(products)
    }

    return (
        <Section bgComponent={<MovingGrid direction={-1} color="#2D3748"/>}>
            <VStack>
                <Heading variant="headline">Represent Daft Punk</Heading>
                <Heading>Official Daft Punk Dog Collars</Heading>
            </VStack>

            <SimpleGrid columns={[2, 2, 4]} gap={8}>
                {products?.length > 0 && products.map(product => {
                    return (
                        <VStack key={product.id} align="left">
                            {product.images.length > 0 && 
                                <Box bg="gray.800">
                                    <Image 
                                        alt="" 
                                        src={product.images[0].src} 
                                        width={product.images[0].width} 
                                        height={product.images[0].height} 
                                        layout="responsive" />
                                </Box>
                            }
                            <HStack align="start" w="100%" justifyContent="space-between">
                            <Text size="sm">{product.title}</Text>
                            <Text color="gray.400">$30</Text>
                            </HStack>
                        </VStack>
                    )
                })}
            </SimpleGrid>

            <VStack>
                <ButtonGroup colorScheme="whiteAlpha" align="center" justify="center" mx="auto">
                    {initialCollections.map(collection => 
                        <Button 
                            aria-label={`View ${collection.title}`} key={collection.id} 
                            disabled={collection.id === activeCollectionId} 
                            onClick={() => loadCollectionProductsById(collection.id)}>{collection.title}</Button>
                    )}
                </ButtonGroup>
            </VStack>
    </Section>
    )
}