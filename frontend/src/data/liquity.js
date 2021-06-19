
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const endpoint = 'https://api.thegraph.com/subgraphs/name/liquity/liquity'

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache()
});

function query(query) {
  return client.query({
    query: gql(query)
  })
}

export default query
