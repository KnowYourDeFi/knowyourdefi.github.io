import React from 'react'
import Table from "../liquity/charts/ReactTable"
import {ellipsesStr, toLink} from '../utils/ChartUtils'
import axios from 'axios'
import {numberWithCommas} from '../utils/NumberUtils'

const loadingState = {
  data: [
    {
      info: {
        symbol: '',
        link: ''
      },
      balance: 'Loading...',
      value: ''
    }
  ]
}

const noDataState = {
  data: [
    {
      info: {
        symbol: '',
        link: ''
      },
      balance: 'No Data',
      value: ''
    }
  ]
}

class UserAssetsInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = noDataState
    }

    numToString(number) {
      if (number < 1) {
        return parseFloat(number.toFixed(4))
      } else {
        return numberWithCommas(number.toFixed(2))
      }
    }

    fetchData() {
      if (!this.props.address) return
      let url = `https://stg-api.unmarshal.io/v1/ethereum/address/${this.props.address}/assets?auth_key=VGVtcEtleQ%3D%3D`
      axios.get(url).then(response => {
        let result = response.data.slice()
        if (result.length === 0) {
          this.setState(noDataState)
          return
        }

        result = result.map((item) => {
          const symbol = ellipsesStr(item.contract_ticker_symbol)
          const balance = item.balance / Math.pow(10, item.contract_decimals)
          const contract = item.contract_address
          const ethContract = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          const link = contract === ethContract ? 'https://etherscan.io/charts' : 'https://etherscan.io/token/' + contract
          return {
            info: {
              symbol: symbol,
              link: link
            },
            balance: this.numToString(balance) + ' ' + symbol,
            value: '$' + this.numToString(item.quote)
          }
        })
        this.setState({
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
        this.setState(loadingState)
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
            Cell: ({ cell: { value } }) => toLink(value.link, value.symbol)
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