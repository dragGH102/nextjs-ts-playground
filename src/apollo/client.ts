import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

let client;

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');
    return new SchemaLink({ schema });
  }
  const { HttpLink } = require('@apollo/client/link/http');
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const apolloClient = client ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    client.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client;
  // Create the Apollo Client once in the client
  if (!client) client = apolloClient;

  return client;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
