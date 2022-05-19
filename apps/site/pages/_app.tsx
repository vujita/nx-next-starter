import { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useMemo } from 'react';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}></Hydrate>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/**
         * Using https://tachyons.io/ for atomic css
         */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons/css/tachyons.min.css"
        />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
