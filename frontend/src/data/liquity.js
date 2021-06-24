
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const kLiquityEndpoint = 'https://api.thegraph.com/subgraphs/name/liquity/liquity'

async function query(ql, url = kLiquityEndpoint) {
  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache()
  });

  let data = await client.query({
    query: gql(ql)
  });
  data = data && data.data
  console.log('query:', ql, 'result:', data)
  return data
}

export default query
