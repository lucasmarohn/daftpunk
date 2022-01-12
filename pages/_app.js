import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import "../styles/globals.css"
import { useEffect} from 'react'
import { theme } from '../theme.js'

function MyApp({ Component, pageProps }) {

  const appHeight = () => {
      const el = document.documentElement
      el.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  useEffect(() => {
      appHeight()
      window.addEventListener('resize', appHeight)
      return ()=> {
          window.removeEventListener('resize', appHeight)
      }
  })

  return <ChakraProvider theme={extendTheme(theme)}>
    <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
