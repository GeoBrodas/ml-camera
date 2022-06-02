import { ChakraProvider } from '@chakra-ui/react';
import ModalProvider from '../context/loadModel';

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ModalProvider>
  );
}

export default MyApp;
