import React from 'react'
import {query, liquityClient, uniV2Client} from '../liquity/LiquityData'
import { gql } from '@apollo/client'
import ColorProgressBar from '../widget/ColorProgressBar'
import { ReactComponent as LiquityLogo } from '../resources/liquity.svg'
import { LqtyAPR } from '../liquity/charts/LqtyAPR'
import LusdAPR from '../liquity/charts/LusdAPR'
import { isNumeric } from '../utils/NumberUtils'

async function getPrices() {
  const gql = `
  {
      lusd:pair(id:"0xf20ef17b889b437c151eb5ba15a47bfc62bff469")
      {
        token1Price
      }

      lqty:pair(id:"0xb13201b48b1e61593df055576964d0b3aab66ea3")
      {
        token1Price
      }

      bundle(id: "1" ) {
          ethPrice
      }
  }
  `
  //Get Uniswap V2 prices
  let data = await query(gql, uniV2Client)

  const ethPrice = parseFloat(data.bundle.ethPrice)
  const lqtyInEth = parseFloat(data.lqty.token1Price)
  const lusdInEth = parseFloat(data.lusd.token1Price)
  return {
      ethPrice,
      lqtyPrice: lqtyInEth * ethPrice,
      lusdPrice: lusdInEth * ethPrice
  }
}

class UserLiquityInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          address: props.address.toLowerCase(),
          loading: true,
          data: {}
        }
    }

    async getLiquityInfo() {
        const liquityInfoQuery = `
        query liquityInfo($userId: Bytes!) {
            user(id: $userId)
            {
              trove
              {
                id
                  status
                  collateral
                  debt
              }
              stake
              {
                amount
              }
              stabilityDeposit
              {
                depositedAmount
              }
            }
        }
        `

        let data = await liquityClient.query({
            query: gql(liquityInfoQuery),
            variables: {
                userId: this.state.address
            },
            fetchPolicy: 'cache-first',
          })
        return data.data
    }

    componentDidMount() {
        if (this.props.address) {
            Promise.all([getPrices(), this.getLiquityInfo()]).then(responses => {
                this.process(responses[0], responses[1])
            }).catch(e => {
                console.error(e)
            })
        }
    }

    process(prices, liquityInfo) {
        const info = liquityInfo.user
        if (!info) { //No liquity info
            this.setState({
                loading: false,
                data: {}
            })
            return
        }
        let result = {}
        if (info.trove) {
            const collateral = parseFloat(info.trove.collateral)
            const debtValue = parseFloat(info.trove.debt)
            const debt = debtValue / prices.lusdPrice
            const collateralValue = collateral * prices.ethPrice
            const risk = collateralValue / debtValue * 100
            result = {
                collateral: parseFloat(collateral.toFixed(2)),
                collateralValue: parseFloat(collateralValue.toFixed(2)),
                debt: parseFloat(debt.toFixed(2)),
                debtValue: parseFloat(debtValue.toFixed(2)),
                risk: isNumeric(risk) ? parseFloat(risk.toFixed(2)) : null
            }
        }
        if (info.stake) {
            const lqtyBalance = parseFloat(info.stake.amount)
            result = {
                ...result,
                lqtyBalance: parseFloat(lqtyBalance.toFixed(2)),
                lqtyValue: parseFloat((lqtyBalance * prices.lqtyPrice).toFixed(2))
            }
        }
        if (info.stabilityDeposit) {
            const lusdBalance = parseFloat(info.stabilityDeposit.depositedAmount)
            result = {
                ...result,
                lusdBalance: parseFloat(lusdBalance.toFixed(2)),
                lusdValue: parseFloat((lusdBalance * prices.lusdPrice).toFixed(2))
            }
        }
        this.setState({
            loading: false,
            data: result
        })
    }

    liquityStakingTable = () => {
        let loading = this.state.loading
        let data = this.state.data
        return <table className="table">
          <thead>
            <tr>
              <th>Staked</th>
              <th>Balance</th>
              <th>APR</th>
              <th>Value(USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>LQTY</th>
              <td>
                  {loading ? 'Loading' : ((typeof data.lqtyBalance !== 'undefined') ? data.lqtyBalance + ' LQTY' : 'No data')}
              </td>
              <td><LqtyAPR /></td>
              <td>
                  {loading ? 'Loading' : ((typeof data.lqtyValue !== 'undefined') ? '$' + data.lqtyValue : 'No data')}
              </td>
            </tr>
            <tr>
              <th>LUSD</th>
              <td>
                  {loading ? 'Loading' : ((typeof data.lusdBalance !== 'undefined') ? data.lusdBalance + ' LUSD' : 'No data')}
              </td>
              <td>
                  <LusdAPR />
              </td>
              <td>
                  {loading ? 'Loading' : ((typeof data.lusdValue !== 'undefined') ? '$' + data.lusdValue : 'No data')}
              </td>
            </tr>
          </tbody>
        </table>
    }
  
    liquityTroveBorrowTable = () => {
        let loading = this.state.loading
        let data = this.state.data
        return <table className="table">
          <thead>
            <tr>
              <th>Borrow</th>
              <th>Balance</th>
              <th>Value(USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>LUSD</th>
              <td>
                  {loading ? 'Loading' : ((typeof data.debt !== 'undefined') ? data.debt + ' LUSD' : 'No data')}
              </td>
              <td>
                  {loading ? 'Loading' : ((typeof data.debtValue !== 'undefined') ? '$' + data.debtValue : 'No data')}
              </td>
            </tr>
          </tbody>
        </table>
    }
  
    liquityTroveSuppliedTable = () => {
        let loading = this.state.loading
        let data = this.state.data
        return <table className="table">
          <thead>
            <tr>
              <th>Supplied</th>
              <th>Balance</th>
              <th>Value(USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>ETH</th>
              <td>
                  {loading ? 'Loading' : ((typeof data.collateral !== 'undefined') ? data.collateral + ' ETH' : 'No data')}
              </td>
              <td>
                  {loading ? 'Loading' : ((typeof data.collateralValue !== 'undefined') ? '$' + data.collateralValue : 'No data')}
              </td>
            </tr>
          </tbody>
        </table>
    }

    riskAlert = () => {
        let loading = this.state.loading
        let data = this.state.data
        if (loading) return 'Loading'
        if (!isNumeric(data.risk)) return 'No data'
        return <ColorProgressBar
          progress={data.risk}
          range={[{
            size: 110,
            color: 'rgb(250, 127, 102)',
            name: 'Killed',
            desc: 'If the collateral ratio of your trove is below this value, your ETHs will be liquidated.'
          }, {
            size: 40,
            color: 'rgb(247, 230, 80)',
            name: 'High Risk',
            desc: 'Your trove is still at greater risk of being liquidated.'
          }, {
            size: 50,
            color: 'rgb(175, 226, 76)',
            name: 'Master',
            desc: 'If you are not a DeFi master, you may not play with effortless in this range.'
          }, {
            size: 300,
            color: 'rgb(134, 223, 79)',
            name: 'Healthy',
            desc: 'A much safer zone for most users.'
          }]}
        />
    }

    render() {
        return (
            <>
            <div className="defi-title">
              <LiquityLogo className="defi-title-logo" />
              <span className="defi-title-text">Liquity</span>
            </div>
            <div className="defi-card">
              <div className="defi-card-large-title">
                Trove
              </div>
              {this.liquityTroveSuppliedTable()}
              {this.liquityTroveBorrowTable()}
            </div>
            <div className="defi-card">
              <div className="defi-card-large-title">
                Risk Alert
              </div>
              {this.riskAlert()}
            </div>
            <div className="defi-card">
              <div className="defi-card-large-title">
                Staking
              </div>
              {this.liquityStakingTable()}
            </div>
            </>
        )
    }
}

export {UserLiquityInfo}
export {getPrices}