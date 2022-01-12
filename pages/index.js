

import { Box } from "@chakra-ui/react"
import { staticVideoData } from "../data/videos"
import { SectionVideo } from "../components/SectionVideo"
import { SectionAlbums } from '../components/SectionAlbums'
import { SectionProducts } from '../components/SectionProducts'
import { SectionBanner } from '../components/SectionBanner'
import { SectionTour } from '../components/SectionTour'
import { SectionTopTracks } from '../components/SectionTopTracks'
import { Section } from '../components/Section'
import { client } from '../lib/shopifyClient'
import { Heading, VStack } from '@chakra-ui/react'
import { MovingGrid } from '../components/MovingGrid'
import { getSpotifyAccessToken } from '../lib/getSpotifyAccessToken'
import { getSpotifyAlbums } from "../lib/getSpotifyAlbums"
import { getAlbumLengthObject } from "../lib/getAlbumLengthObject"
import { getSpotifyTopTracks } from "../lib/getSpotifyTopTracks"
import { Footer } from "../components/Footer"
import Head from 'next/head'

const SPOTIFY_ARTIST_ID = "4tZwfgrHOc3mvqYlEYSvVi" 
const YOUTUBE_CHANNEL_ID = "UC_kRDKYrUlrbtrSiyu5Tflg"

export default function Home({ 
  SPOTIFY_ACCESS_TOKEN, 
  YOUTUBE_API_KEY, 
  albumData, 
  albumsQuery, 
  albumsItems, 
  videoData, 
  initialCollections, 
  initialProducts, 
  topTracks
}) {

  return (
    <Box bg="black" color="gray.100" fontFamily="Futura">
      <Head>
        <title>New Single — Revolution — Daft Punk</title>
        <meta name="description" content="Official Daft Punk Website and Merch Store"></meta> 
      </Head>
      <SectionBanner />
      <Section bgComponent={<MovingGrid direction={-1} />}>
        <VStack spacing={8}>
          <Heading variant="headline">
            Your Favorite Robots have returned
          </Heading>
          <Heading as="h2" lineHeight="1.5em" fontFamily="Futura" fontWeight="300" textAlign="center">
            After a hiatus lasting five planetary revolutions, the legendary electronic duo is back together. Their new single <i>Revolution</i> is out now. You can join Daft Punk on their World Tour — beginning March 2026.
          </Heading>
        </VStack>
      </Section>
      <SectionAlbums albumsQuery={albumsQuery} albums={albumData} accessToken={SPOTIFY_ACCESS_TOKEN} artistId={SPOTIFY_ARTIST_ID} />
      <SectionTopTracks topTracks={topTracks} />
      <SectionTour />
      <SectionVideo videoData={videoData} apiKey={YOUTUBE_API_KEY} channelId={YOUTUBE_CHANNEL_ID} />
      <SectionProducts initialCollections={initialCollections} initialProducts={initialProducts} />
      <Footer />
    </Box>
  )
}

// Provide an update

export async function getStaticProps(context) {
  // Get Tokens
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const SPOTIFY_ACCESS_TOKEN = await getSpotifyAccessToken()

  // Get Spotify Albums
  const albumsQuery = await getSpotifyAlbums(SPOTIFY_ACCESS_TOKEN, SPOTIFY_ARTIST_ID)
  
  const albumsItems = albumsQuery?.items || []
  const albumData = albumsItems.slice(0,4) || []
  const albumLengthData = getAlbumLengthObject(albumsQuery.items)

  const topTracks = await getSpotifyTopTracks(SPOTIFY_ACCESS_TOKEN, SPOTIFY_ARTIST_ID)


  // Get videos
  let videoData = {items: staticVideoData}
  // try {
  //     const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&q=daftpunk&maxResults=${3}&type=video&order=viewCount&channelId=${YOUTUBE_CHANNEL_ID}`
  //     const videoQuery = await fetch(endpoint)
  //     videoData = await videoQuery.json()
  //     console.log('endpoint', endpoint)
  // } catch(e) {
  //   console.error("VIDEO DATA", e)
  // }
  
  // Get 2 Shopify Collections
  let collectionData = [] 
  let shopifyCollections = []
  try {
    shopifyCollections = await client.collection.fetchAll()
    collectionData = JSON.parse(JSON.stringify(shopifyCollections.slice(0,2)))
  } catch(e) {
    console.error("SHOPIFY COLLECTION:", e)
  }


  // Get Products for First Shopify Collection
  let productData = [] 
  try {
    if(shopifyCollections.length > 0) {

      let shopifyProducts = await client.collection.fetchWithProducts(shopifyCollections[0].id, {
        productsFirst: 4,
      })
      productData = JSON.parse(JSON.stringify( shopifyProducts.products ))
    }
  } catch(e) {
    console.error("SHOPIFY PRODUCTS", e)
  }

  return {
    props: {
      SPOTIFY_ACCESS_TOKEN,
      YOUTUBE_API_KEY,
      albumsQuery,
      albumsItems,
      albumData,
      videoData,
      topTracks,
      initialCollections: collectionData,
      initialProducts: productData
    }
  }
}
