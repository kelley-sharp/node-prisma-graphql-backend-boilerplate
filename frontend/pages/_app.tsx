import "src/shared/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "src/shared/graphql/apollo-client";

type AppPropsWithLayout = AppProps;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
