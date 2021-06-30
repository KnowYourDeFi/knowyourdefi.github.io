import React, { useState, useEffect, useMemo } from 'react'
import {query} from '../LiquityData'
import Table from "./ReactTable"
import {formatDate} from '../../utils/Timestamps'



const ellipsesStr = (str) => {return str.substr(0, 6) + '...' + str.substr(str.length-4, str.length)}
const toLink = (prefix, value) => {
    return (
        <a href={prefix + value} target="_blank" rel="noreferrer"> {ellipsesStr(value)} </a>
    )
}

function Liquidations() {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
          const result = await getRecentLiquidations()
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
                Header: "Owner",
                accessor: "owner",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://etherscan.io/address/', value)
            },
            {
                Header: "Collateral (ETH)",
                accessor: "collateralInETH",
                width: 150
            },
            {
                Header: "Debt (LUSD)",
                accessor: "debtInUSD",
                width: 150
            },
            {
                Header: "ETH Price (USD)",
                accessor: "ethPrice",
                width: 150
            },
            {
                Header: "Collateral Ratio",
                accessor: "collateralRatio",
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
        <div className="liquidations">
          <Table columns={columns} data={data} />
        </div>
    )
}

async function getRecentLiquidations() {
    const gql = `
    {
        liquidations(first:100, orderBy:sequenceNumber, orderDirection: desc)
      {
        transaction
        {
          id
          timestamp
        }
        liquidator
        {
          id
        }
        liquidatedDebt
        liquidatedCollateral
        troveChanges
        {
          collateralRatioBefore
          systemStateBefore
          {
               price
          }
        }
      }
    }
    `
    let data = await query(gql)
    let liquiations = data.liquidations.slice()
    //Sort by timestamp descending order
    liquiations.sort((a, b) => a.transaction.timestamp > b.transaction.timestamp ? -1 : 1)
    //Format data
    let result = liquiations.map((item) => {
        return {
            timeString: formatDate(item.transaction.timestamp, 'YYYY-MM-DD HH:mm'),
            owner: item.liquidator.id,
            collateralInETH: parseFloat(item.liquidatedCollateral).toFixed(4),
            debtInUSD: parseFloat(item.liquidatedDebt).toFixed(2),
            ethPrice: parseFloat(item.troveChanges[0].systemStateBefore.price).toFixed(2),
            collateralRatio: parseFloat(item.troveChanges[0].collateralRatioBefore * 100).toFixed(2)+"%",
            transaction: item.transaction.id
        }
    })
    return result
}

export default Liquidations
