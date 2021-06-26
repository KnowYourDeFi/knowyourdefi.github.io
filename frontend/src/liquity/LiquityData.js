import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import {hourlyTimestamps} from './Timestamps'

export const liquityClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/liquity/liquity',
  cache: new InMemoryCache()
})

export const uniV2Client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  cache: new InMemoryCache()
})

export const uniV3Client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache()
})

export const blockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
  cache: new InMemoryCache(),
})

export async function splitQuery(queryGenarator, client, vars, list, skipCount = 100) {
  console.log('splitQuery executed')
  let fetchedData = {}
  let allFound = false
  let skip = 0

  while (!allFound) {
    let end = list.length
    if (skip + skipCount < list.length) {
      end = skip + skipCount
    }
    let sliced = list.slice(skip, end)
    let result = await client.query({
      query: queryGenarator(...vars, sliced),
      fetchPolicy: 'cache-first',
    })
    fetchedData = {
      ...fetchedData,
      ...result.data,
    }
    if (Object.keys(result.data).length < skipCount || skip + skipCount > list.length) {
      allFound = true
    } else {
      skip += skipCount
    }
  }

  return fetchedData
}

export async function getBlocksFromTimestamps(timestamps, skipCount = 500) {
  console.log('getBlocksFromTimestamps executed')
  if (timestamps?.length === 0) {
    return []
  }

  let fetchedData = await splitQuery(getBlocks, blockClient, [], timestamps, skipCount)

  let blocks = []
  if (fetchedData) {
    for (var t in fetchedData) {
      if (fetchedData[t].length > 0) {
        blocks.push({
          timestamp: t.split('t')[1],
          number: fetchedData[t][0]['number'],
        })
      }
    }
  }
  return blocks
}

export async function last7DayBlocks() {
  console.log('last7DayBlocks executed')
  return getBlocksFromTimestamps(hourlyTimestamps())
}

export async function query(ql, client = liquityClient) {
  let data = await client.query({
    query: gql(ql),
    fetchPolicy: 'cache-first'
  });
  data = data && data.data
  console.log('query:', ql, 'result:', data)
  return data
}

function getBlocks(timestamps) {
  console.log('getBlocks(timestamps) executed')
  let queryString = 'query blocks {'
  queryString += timestamps.map((timestamp) => {
    return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
      timestamp + 600
    } }) {
      number
    }`
  })
  queryString += '}'
  return gql(queryString)
}
