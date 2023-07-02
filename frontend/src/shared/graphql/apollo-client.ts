import {
  ApolloClient,
  HttpLink,
  HttpOptions,
  InMemoryCache,
} from "@apollo/client";
import possibleTypesJson from "./possible-types.json";
import { API_URL } from "src/shared/constants";

const possibleTypes = possibleTypesJson.possibleTypes;

export const apolloClient = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache({ possibleTypes }),
});

export function getServerSideClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: `${API_URL}/graphql`,
    }),
    cache: new InMemoryCache({
      possibleTypes,
    }),
  });
}
