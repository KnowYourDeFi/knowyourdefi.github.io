import React from 'react'
import axios from 'axios'
import {numberWithCommas} from '../utils/NumberUtils'

class UserAssetsInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          data: []
        }
    }

    fetchData() {
      if (!this.props.address) return
      let url = `https://stg-api.unmarshal.io/v1/ethereum/address/${this.props.address}/assets?auth_key=VGVtcEtleQ%3D%3D`
      axios.get(url).then(response => {
        this.setState({
          loading: false,
          data: response.data
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
          data: []
        })
        this.fetchData()
      }
    }



    renderWalletTable() {
        const loading = this.state.loading
        if (loading) return 'Loading'
        const data = this.state.data
        return <tbody>
            {this.state.data.map((item) => {
              const symbol = item.contract_ticker_symbol
              const decimal = item.contract_decimals
              const balance = numberWithCommas((item.balance / Math.pow(10, decimal)).toFixed(2))
              const value = numberWithCommas(item.quote.toFixed(2))
              return (
              <tr>
                <th>{symbol}</th>
                <td>
                    {balance + ' ' + symbol}
                </td>
                <td>
                    {'$' + value}
                </td>
              </tr>)
            })}
          </tbody>
    }

    render() {
        return (
            <div className="defi-card">
                <div className="defi-card-large-title">
                    Ethereum
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Balance</th>
                      <th>Value(USD)</th>
                    </tr>
                  </thead>
                  {this.renderWalletTable()}
                </table>
            </div>
        )
    }
}

export default UserAssetsInfo