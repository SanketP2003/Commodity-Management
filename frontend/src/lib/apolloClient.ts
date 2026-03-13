import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { API_BASE_URL } from './constants';
import { getToken } from './auth';

const httpLink = createHttpLink({
  uri: `${API_BASE_URL}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== 'undefined' ? getToken() : null;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});

