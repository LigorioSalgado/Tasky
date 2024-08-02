import { ApolloClient, HttpLink, InMemoryCache,DefaultOptions } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";


const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }


export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_GRAPHQL_URL,
    }),
    defaultOptions
  });
});