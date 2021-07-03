import React, { useState, useEffect, useMemo } from 'react'
import Table from "../liquity/charts/ReactTable"
import {ellipsesStr, toLink} from '../utils/ChartUtils'
import axios from 'axios'
import {numberWithCommas} from '../utils/NumberUtils'

function UserAssetsInfo(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
          const result = await fetchData(props.address)
          setData(result);
        })()
    }, [props.address])

    const columns = useMemo(
        () => [
            {
                Header: "Asset",
                accessor: "info",
                width: 150,
                Cell: ({ cell: { value } }) => toLink('https://etherscan.io/token/' + value.contract, ellipsesStr(value.symbol))
            },
            {
                Header: "Balance",
                accessor: "balance",
                width: 150
            },
            {
                Header: "Value(USD)",
                accessor: "value",
                width: 150
            }
        ],
        []
    )
    return (
    <div className="defi-card">
        <div className="defi-card-large-title">
            Ethereum
        </div>
        <Table columns={columns} data={data} />
    </div>
    )
}

async function fetchData(address) {
  if (!address) return
  let url = `https://stg-api.unmarshal.io/v1/ethereum/address/${address}/assets?auth_key=VGVtcEtleQ%3D%3D`
  try {
    const response = await axios.get(url)
    let result = response.data.slice()
    result = result.map((item) => {
      const symbol = item.contract_ticker_symbol
      const decimal = item.contract_decimals
      const balance = numberWithCommas((item.balance / Math.pow(10, decimal)).toFixed(2))
      const value = numberWithCommas(item.quote.toFixed(2))
      return {
        info: {
          symbol: symbol,
          contract: item.contract_address
        },
        balance: balance + ' ' + ellipsesStr(symbol),
        value: '$' + value
      }
    })
    return result
  } catch (e) {
    console.error(e)
  }
}

export default UserAssetsInfo