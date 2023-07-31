import Layout from '@/layouts/Home';
import '../styles/globals.css';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { GraphProvider } from '@/hooks/graphHook';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GraphProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GraphProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
