import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "../styles/globals.css"
import { theme } from '../theme.js'

function MyApp({ Component, pageProps }) {

  return <ChakraProvider theme={extendTheme(theme)}>
    <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
