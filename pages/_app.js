import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "../styles/globals.css"
import { theme } from '../theme.js'
import { MetaMaskProvider } from "metamask-react";

function MyApp({ Component, pageProps }) {

  return <MetaMaskProvider>
    <ChakraProvider theme={extendTheme(theme)}>
      <Component {...pageProps} />
    </ChakraProvider>
  </MetaMaskProvider>
}

export default MyApp
