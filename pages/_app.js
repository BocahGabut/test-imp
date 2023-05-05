import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors })
const queryClient = new QueryClient()

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App;