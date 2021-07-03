import React from 'react'
import axios from 'axios'
import {getPrices} from './UserLiquityInfo'

class UserAssetsInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          data: {}
        }
    }

    async getAssets() {
        let url = 'https://knowyourdefifunc.azurewebsites.net/api/GetAccountProfileFunc?address=' + this.props.address
        let response = await axios.get(url)
        const data = response.data.data
        const eth = data.eth_balance ?? 0
        const lqty = data.eth_balance ?? 0
        const lusd = data.lusd_balance ?? 0
        return {
            eth: eth / 1e18,
            lqty: lqty / 1e18,
            lusd: lusd / 1e18
        }
    }

    fetchData() {
        if (!this.props.address) return

        Promise.all([getPrices(), this.getAssets()]).then(responses => {
          const prices = responses[0]
          const assets = responses[1]
          this.setState({
            loading: false,
            data: {
              eth: parseFloat(assets.eth.toFixed(2)),
              lqty: parseFloat(assets.lqty.toFixed(2)),
              lusd: parseFloat(assets.lusd.toFixed(2)),
              ethValue: parseFloat((assets.eth * prices.ethPrice).toFixed(2)),
              lqtyValue: parseFloat((assets.lqty * prices.lqtyPrice).toFixed(2)),
              lusdValue: parseFloat((assets.lusd * prices.lusdPrice).toFixed(2))
            }
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
          data: {}
        })
        this.fetchData()
      }
    }

    walletEthTable() {
        const loading = this.state.loading
        const data = this.state.data
        return <table className="table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Balance</th>
              <th>Value(USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>ETH</th>
              <td>
                  {loading ? 'Loading' : data.eth + ' ETH'}
              </td>
              <td>
                  {loading ? 'Loading' : '$' + data.ethValue}
              </td>
            </tr>
            <tr>
              <th>LQTY</th>
              <td>
                  {loading ? 'Loading' : data.lqty + ' LQTY'}
              </td>
              <td>
                  {loading ? 'Loading' : '$' + data.lqtyValue}
              </td>
            </tr>
            <tr>
              <th>LUSD</th>
              <td>
                  {loading ? 'Loading' : data.lusd + ' LUSD'}
              </td>
              <td>
                  {loading ? 'Loading' : '$' + data.lusdValue}
              </td>
            </tr>
          </tbody>
        </table>
    }

    render() {
        return (
            <div className="defi-card">
                <div className="defi-card-large-title">
                    Ethereum
                </div>
                {this.walletEthTable()}
            </div>
        )
    }
}

export default UserAssetsInfo