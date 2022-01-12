import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import "../styles/globals.css"
import { useEffect, useState, useRef } from 'react'
import { theme } from '../theme.js'

function MyApp({ Component, pageProps }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollTopRef = useRef()

  const handleScroll = () => {
      const position = document.body.scrollTop || document.documentElement.scrollTop
      setScrollPosition(position)
  }
  useEffect(() => {
      window.addEventListener('scroll', handleScroll, {passive: true})
      return ()=> window.removeEventListener('scroll', handleScroll)
  })

  return <ChakraProvider theme={extendTheme(theme)}>
    <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
