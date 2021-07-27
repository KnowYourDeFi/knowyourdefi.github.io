import React, { useState, useEffect, useMemo } from 'react'
import {query, hoprXdaiClient} from '../HoprData'
import Table from "../../liquity/charts/ReactTable"
import {formatDate} from '../../utils/Timestamps'

const ellipsesStr = (str) => {return str.substr(0, 6) + '...' + str.substr(str.length-4, str.length)}
const toLink = (prefix, value) => {
    return (
        <a href={prefix + value} target="_blank" rel="noreferrer"> {ellipsesStr(value)} </a>
    )
}

export function Transactions() {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
          const result = await getRecentTransactions()
          setData(result);
        })()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Timestamp",
                accessor: "timeString",
                width: 150
            },
            {
                Header: "From",
                accessor: "from",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://etherscan.io/address/', value)
            },
            {
                Header: "To",
                accessor: "to",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://etherscan.io/address/', value)
            },
            {
                Header: "Amount (HOPR)",
                accessor: "amount",
                width: 150
            },
            {
                Header: "Transaction",
                accessor: "transaction",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://etherscan.io/tx/', value)
            }
        ],
        []
    )

    return (
        <div className="transactions">
          <Table columns={columns} data={data} />
        </div>
    )
}

async function getRecentTransactions() {
    const gql = `
    {
        transferEvents(first:100, orderBy:blockTimestamp, orderDirection: desc)
      {
        blockTimestamp
        from
        to
        amount
        transaction
        {
          id
        }
      }
    }
    `
    let data = await query(gql)
    let transactions = data.transferEvents.slice()
    //Sort by timestamp descending order
    transactions.sort((a, b) => a.blockTimestamp > b.blockTimestamp ? -1 : 1)
    //Format data
    let result = transactions.map((item) => {
        return {
            timeString: formatDate(item.blockTimestamp, 'YYYY-MM-DD HH:mm'),
            from: item.from,
            to: item.to,
            amount: parseFloat(item.amount).toFixed(2),
            transaction: item.transaction.id
        }
    })
    return result
}

export function XdaiTransactions() {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
          const result = await getRecentXdaiTransactions()
          setData(result);
        })()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Timestamp",
                accessor: "timeString",
                width: 150
            },
            {
                Header: "From",
                accessor: "from",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://blockscout.com/xdai/mainnet/address/', value)
            },
            {
                Header: "To",
                accessor: "to",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://blockscout.com/xdai/mainnet/address/', value)
            },
            {
                Header: "Amount (HOPR)",
                accessor: "amount",
                width: 150
            },
            {
                Header: "Transaction",
                accessor: "transaction",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://blockscout.com/xdai/mainnet/tx/', value)
            }
        ],
        []
    )

    return (
        <div className="xdaiTransactions">
          <Table columns={columns} data={data} />
        </div>
    )
}

async function getRecentXdaiTransactions() {
    const gql = `
    {
        transferEvents(first:100, orderBy:blockTimestamp, orderDirection: desc)
      {
        blockTimestamp
        from
        to
        amount
        transaction
        {
          id
        }
      }
    }
    `
    let data = await query(gql, hoprXdaiClient)
    let transactions = data.transferEvents.slice()
    //Sort by timestamp descending order
    transactions.sort((a, b) => a.blockTimestamp > b.blockTimestamp ? -1 : 1)
    //Format data
    let result = transactions.map((item) => {
        return {
            timeString: formatDate(item.blockTimestamp, 'YYYY-MM-DD HH:mm'),
            from: item.from,
            to: item.to,
            amount: parseFloat(item.amount).toFixed(2),
            transaction: item.transaction.id
        }
    })
    return result
}

