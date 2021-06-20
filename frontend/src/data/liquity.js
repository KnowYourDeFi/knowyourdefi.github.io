
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const endpoint = 'https://api.thegraph.com/subgraphs/name/liquity/liquity'

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache()
});

async function query(ql) {
  let data = await client.query({
    query: gql(ql)
  });
  data = data && data.data
  console.log('query:', ql, 'result:', data)
  return data
}

export default query
