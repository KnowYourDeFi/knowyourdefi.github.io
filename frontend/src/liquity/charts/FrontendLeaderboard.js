import React, { useState, useEffect, useMemo } from 'react'
import {query, liquityClient} from '../LiquityData'
import { gql } from '@apollo/client'
import Table from "./ReactTable"

const ellipsesStr = (str) => {return str.substr(0, 6) + '...' + str.substr(str.length-4, str.length)}
const toLink = (prefix, value) => {
    return (
        <a href={prefix + value} target="_blank" rel="noreferrer"> {ellipsesStr(value)} </a>
    )
}

export default function FrontendLeaderboard() {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
          const result = await getLeaderboard()
          setData(result);
        })()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
                width: 150
            },
            {
                Header: "Tag",
                accessor: "tag",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://etherscan.io/address/', value)
            },
            {
                Header: "Stability Pool Size",
                accessor: "depositedAmount",
                width: 150
            },
            {
                Header: "Active Depositors",
                accessor: "depositorCount",
                width: 150
            },
            {
                Header: "Stability Pool Share",
                accessor: "share",
                width: 150
            },
            {
                Header: "Kickback Rate",
                accessor: "kickbackRate",
                width: 150
            }
        ],
        []
    )

    return <Table columns={columns} data={data} />
}

const addressNameDict = {
    '0x30e5d10dc30a0ce2545a4dbe8de4fcba590062c5': 'liquity.app [liquidlattice]',
    '0x5292f5dadefee3f34c271a41f2ca438c89593674': 'freely.finance',
    '0x707f18262088e7a8b0d10b7f0c14b50d1cd2b019': 'lusd.eth.link [1kx]',
    '0x2ec9b51cf7dabc9f6c3f825c285b28db615eb232': 'liquity.fun',
    '0xf1c30d30e07e6940d1c12ea25502e2c40d752171': 'liquity.gg',
    '0x03cd116cabe0747f31a71b3565877717097fc06c': 'liquityapp.com',
    '0x47a7d15b7452820dd7a565ea9c39d8b6cef51ed7': 'app.liquity.fi',
    '0x04e313306c008f704ad6e34a08d6523db3a271f9': 'eth.liquity.fi',
    '0xcddb25d5b3776da869d83dfc45c692d556cc66ac': 'multiplier.fi',
    '0x843c837dd73d9a52403fd6d8d68ba4fc1df3c5b4': 'zerion.io',
    '0x74630370197b4c4795bfeef6645ee14f8cf8997d': 'cp0x',
    '0x3417adc19481fef4fcf29147e681c7127a57cd42': 'lusd.fi',
    '0x84ac08e2eee5c0d919c5ca82f6b216ae97c15ec0': 'yliquity.finance',
    '0x5c7a871d65ced6e0063359c08f0589cebd672867': 'lqty.io',
    '0x58dd12706093459958F5fCDd2ce065D3E6034903': 'waterslide.app',
    '0xB7f4187D3D55275F81190154a824833700D232cC': 'waterslide.app'
}

async function getLeaderboard() {
    const gql = `
    {
        frontends(first:1000)
        {
          id
          kickbackRate
          deposits(where:{depositedAmount_gt:0})
          {
            depositedAmount
          }
        }
    }
    `
    const data = await query(gql)
    //Query deposits
    const frontends = await fetchDeposits(data.frontends)
    return process(frontends)
}

function process(frontends) {
    const add = (accumulator, currentValue) => {
        return {depositedAmount: parseFloat(accumulator.depositedAmount) + parseFloat(currentValue.depositedAmount)}
    }
    let result = frontends.map((item) => {
        const tag = item.id
        const name = addressNameDict[tag] ?? ''
        const kickbackRate = item.kickbackRate * 100 + '%'
        const depositorCount = item.deposits.length
        const depositedAmount = parseFloat(item.deposits.length === 0 ? 0 : item.deposits.reduce(add).depositedAmount)
        return {
            tag,
            name,
            kickbackRate,
            depositorCount,
            depositedAmount
        }
    })
    const totalDeposits = result.reduce(add).depositedAmount
    result = result.map((item) => {
        const share =  item.depositedAmount / totalDeposits
        return {
            ...item,
            depositedAmount: parseFloat(item.depositedAmount.toFixed(2)),
            share: parseFloat((share * 100).toFixed(2)) + '%'
        }
    })
    //Sort by depositedAmount in descending order
    result.sort((a, b) => a.depositedAmount < b.depositedAmount? 1 : -1)
    return result
}

async function fetchDeposits(frontends) {
    //Liquity can only return at most 100 deposits, need to query separately if there are more
    let needQuery = []
    let noNeedToQuery = []
    //Split frontends array into 2, one with 100 deposits, one with less than 100
    frontends.forEach(frontend => {
        if (frontend.deposits.length === 100) {
            needQuery.push(frontend)
        } else {
            noNeedToQuery.push(frontend)
        }
    })
    let result = []
    await Promise.all(needQuery.map(async (frontend) => {
        try {
            const deposits = await queryDeposits(frontend.id)
            result.push({
                ...frontend,
                deposits: deposits
            })
        } catch (e) {
            console.error(e)
        }
    }))

    return result.concat(noNeedToQuery)
}

async function queryDeposits(frontendId) {
    const depositsQuery = `
    query tokenBalances($frontendId: Bytes!, $skip: Int!) {
        stabilityDeposits(first:1000, skip:$skip, where:{frontend:$frontendId, depositedAmount_gt:0})
        {
          depositedAmount
        }
        troves(where:{status: open},first:1000, skip:$skip, orderBy: collateral, orderDirection: desc)
        {
          collateral
        }
      }
    `

    try {
      let skip = 0
      let allResults = []
      let found = false
      while (!found) {
        let result = await liquityClient.query({
          query: gql(depositsQuery),
          variables: {
            skip: skip,
            frontendId: frontendId
          },
          fetchPolicy: 'cache-first',
        })
        allResults = allResults.concat(result.data.stabilityDeposits)
        if (result.data.stabilityDeposits.length < 1000) {
          found = true
        } else {
          skip += 1000
        }
      }
      return allResults
    } catch (e) {
      console.error(e)
    }
  }
