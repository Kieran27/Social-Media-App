import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/useAuth";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
