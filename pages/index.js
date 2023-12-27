import { Box } from "@chakra-ui/react"

import { SectionVideo } from "../components/SectionVideo"
import { SectionAlbums } from '../components/SectionAlbums'
import { SectionBanner } from '../components/SectionBanner'
import { SectionTour } from '../components/SectionTour'
import { SectionTopTracks } from '../components/SectionTopTracks'
import { SectionIntro } from '../components/SectionIntro'

import { getSpotifyAccessToken } from '../lib/getSpotifyAccessToken'
import { getSpotifyAlbums } from "../lib/getSpotifyAlbums"
import { getSpotifyTopTracks } from "../lib/getSpotifyTopTracks"
import { Footer } from "../components/Footer"
import Head from 'next/head'
import { getShopifyProducts } from "../lib/getShopifyProducts"
import { getShopifyCollections } from '../lib/getShopifyCollections'
import { getYoutubeVideos } from "../lib/getYoutubeVideos"

const SPOTIFY_ARTIST_ID = "4tZwfgrHOc3mvqYlEYSvVi" 
const YOUTUBE_CHANNEL_ID = "UC_kRDKYrUlrbtrSiyu5Tflg"

export default function Home({ 
  SPOTIFY_ACCESS_TOKEN, 
  YOUTUBE_API_KEY, 
  albumData, 
  albumsQuery, 
  videoData, 
  initialCollections, 
  initialProducts, 
  topTracks
}) {
  return (
    <Box bg="black" color="gray.100" fontFamily="futura-pt" w="100%">
      <Head>
        <title>New Single — Revolution — Daft Punk</title>
        <meta name="description" content="Official Daft Punk Website and Merch Store" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SectionBanner />
      <SectionIntro />
      <SectionAlbums albumsQuery={albumsQuery} albums={albumData} accessToken={SPOTIFY_ACCESS_TOKEN} artistId={SPOTIFY_ARTIST_ID} />
      <SectionTopTracks topTracks={topTracks} />
      <SectionTour />
      <SectionVideo videoData={videoData} apiKey={YOUTUBE_API_KEY} channelId={YOUTUBE_CHANNEL_ID} />
      <Footer />
    </Box>
  )
}

export async function getStaticProps(context) {
  // Get Tokens
  const SPOTIFY_ACCESS_TOKEN = await getSpotifyAccessToken()
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

  // Get Spotify Data
  const topTracks = await getSpotifyTopTracks(SPOTIFY_ACCESS_TOKEN, SPOTIFY_ARTIST_ID)
  const albumsQuery = await getSpotifyAlbums(SPOTIFY_ACCESS_TOKEN, SPOTIFY_ARTIST_ID)
  const albumsItems = albumsQuery?.items || []
  const albumData = albumsItems.slice(0,4) || []

  // Get videos
  const videoData = await getYoutubeVideos(YOUTUBE_CHANNEL_ID, 3)
  
  // Get 2 Shopify Collections
  const shopifyCollections = await getShopifyCollections()
  const collectionData = JSON.parse(JSON.stringify( shopifyCollections.slice(0, 2) ))
  
  // Get Products for First Shopify Collection
  const shopifyProducts =  await getShopifyProducts(shopifyCollections[0].id, 4)
  const productData = JSON.parse(JSON.stringify( shopifyProducts.products ))

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
