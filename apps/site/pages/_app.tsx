import { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MantineProvider } from '@mantine/core';
import MainLayout from '../components/main-layout';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}></Hydrate>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <MainLayout title="Starter App">
            <Component {...pageProps} />
          </MainLayout>
        </MantineProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
export function reportWebVitals(_metric) {
  // TODO: Use metric
}
