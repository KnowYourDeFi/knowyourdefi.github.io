import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
// import { trace } from '../utils/DebugUtils'
import {hourlyTimestamps, timestampsSinceHoprEpoch} from '../utils/Timestamps'
import {blockClient} from '../liquity/LiquityData'

export const hoprClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/minatofund/hopr-subgraph-mainnet',
    cache: new InMemoryCache()
})

export const hoprXdaiClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/hoprnet/hopr-on-xdai',
  cache: new InMemoryCache()
})

export async function splitQuery(queryGenarator, client, vars, list, skipCount = 100) {
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
        query: gql(queryGenarator(...vars, sliced)),
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
    if (timestamps?.length === 0) {
        return []
    }
    let fetchedData = await splitQuery(getBlocksQuery, blockClient, [], timestamps, skipCount)

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

  export const last7DayBlocks = () => {
    return getBlocksFromTimestamps(hourlyTimestamps())
  }

  export const blocksSinceHoprEpoch = (hourInterval = 3) => {
    return getBlocksFromTimestamps(timestampsSinceHoprEpoch(hourInterval))
  }

  export async function query(ql, client = hoprClient) {
    let data = await client.query({
      query: gql(ql),
      fetchPolicy: 'cache-first'
    });
    data = data && data.data
    // trace('query:', ql, 'result:', data)
    return data
  }

  function getBlocksQuery(timestamps) {
    let queryString = 'query blocks {'
    queryString += timestamps.map((timestamp) => {
      return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
        timestamp + 600
      } }) {
        number
      }`
    })
    queryString += '}'
    return queryString
  }
