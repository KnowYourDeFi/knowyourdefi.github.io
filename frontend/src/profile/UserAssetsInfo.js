import React from 'react'
import Table from "../liquity/charts/ReactTable"
import {ellipsesStr, toLink} from '../utils/ChartUtils'
import axios from 'axios'
import {numberWithCommas} from '../utils/NumberUtils'

class UserAssetsInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          data: [
            {
              info: {
                symbol: '',
                contract: ''
              },
              balance: 'Loading...',
              value: ''
            }
          ]
        }
    }

    fetchData() {
      if (!this.props.address) return
      let url = `https://stg-api.unmarshal.io/v1/ethereum/address/${this.props.address}/assets?auth_key=VGVtcEtleQ%3D%3D`
      axios.get(url).then(response => {
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
        this.setState({
          loading: false,
          data: result
        })
      }).catch(e => {
        console.error(e)
      })
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
      if (this.props.address !== prevProps.address) {
        this.setState({
          loading: true,
          data: [
            {
              info: {
                symbol: '',
                contract: ''
              },
              balance: 'Loading...',
              value: ''
            }
          ]
        })
        this.fetchData()
      }
    }

    renderWalletTable() {
      let data = this.state.data
      let columns = [
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
      ]
      return (
        <div className="defi-card">
            <div className="defi-card-large-title">
                Ethereum
            </div>
            <Table columns={columns} data={data} />
        </div>
      )
    }

    render() {
        return this.renderWalletTable()
    }
}

export default UserAssetsInfo