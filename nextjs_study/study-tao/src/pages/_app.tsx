import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import TankQueryProviderBase from "@/components/ProviderClient";   // 全局provider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }}>
      <TankQueryProviderBase>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </TankQueryProviderBase>
    </ChakraProvider>
  );
}
