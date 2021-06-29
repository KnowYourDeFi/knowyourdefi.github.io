import React, { useState, useEffect, useMemo } from 'react'
import {query} from '../LiquityData'
import Table from "./ReactTable"
import {formatDate} from '../../utils/Timestamps'

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
                width: 200
            },
            {
                Header: "Owner",
                accessor: "owner",
                width: 400
            },
            {
                Header: "Collateral (ETH)",
                accessor: "collateralInETH",
                width: 200
            },
            {
                Header: "Debt (LUSD)",
                accessor: "debtInUSD",
                width: 200
            },
            {
                Header: "ETH Price (USD)",
                accessor: "ethPrice",
                width: 200
            },
            {
                Header: "Collateral Ratio",
                accessor: "collateralRatio",
                width: 200
            },
            {
                Header: "Transaction",
                accessor: "transaction",
                width: 800
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
            transaction: 'https://etherscan.io/tx/' + item.transaction.id
        }
    })
    return result
}

export default Liquidations