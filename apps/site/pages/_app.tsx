import { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import React, { useEffect, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import MainLayout from '../components/main-layout';
import { useLocalStorage } from '@mantine/hooks';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [localStorageColorScheme, setLocalStorageScheme] =
    useLocalStorage<ColorScheme>({
      key: 'color-scheme',
      defaultValue: colorScheme,
    });
  useEffect(() => {
    if (colorScheme !== localStorageColorScheme) {
      setColorScheme(localStorageColorScheme);
    }
  }, [colorScheme, localStorageColorScheme]);
  const toggleColorScheme = (value?: ColorScheme) =>
    setLocalStorageScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
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
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
            }}
          >
            <MainLayout title="Starter App">
              <Component {...pageProps} />
            </MainLayout>
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
export function reportWebVitals(_metric) {
  // TODO: Use metric
}
