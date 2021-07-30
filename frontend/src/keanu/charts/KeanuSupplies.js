import React from 'react'
import axios from 'axios'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../../utils/Timestamps'
import {query, keanuClient, blocksSinceTbtcEpoch, splitQuery} from '../KeanuData'
import dayjs from 'dayjs'
import {chartBlue, loadingOption} from '../../utils/ChartUtils'
import { numberWithCommas, abbreviateNumber } from '../../utils/NumberUtils'

class TbtcCurrentTotalSupply extends React.Component {
  state = {
    loading: true,
    TBTC: 0,
  }

  componentDidMount() {
    const gql = `{
      TBTC: account(id: "0x0000000000000000000000000000000000000000")
      {
        tbtcBalance
      }
    }`

    query(gql).then(data => {
      this.setState({
        loading: false,
        TBTC: numberWithCommas(data.TBTC.tbtcBalance),
      })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    return this.state.loading ? 'Loading...' : this.state.TBTC
  }
}

class NuCurrentTotalSupply extends React.Component {
  state = {
    loading: true,
    NU: 0,
  }

  componentDidMount() {
    const gql = `{
      NU: account(id: "0x0000000000000000000000000000000000000000")
      {
        nuBalance
      }
    }`

    query(gql).then(data => {
      this.setState({
        loading: false,
        NU: numberWithCommas(parseInt(data.NU.nuBalance)),
      })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    return this.state.loading ? 'Loading...' : this.state.NU
  }
}

class KeepCurrentTotalSupply extends React.Component {
  state = {
    loading: true,
    KEEP: 0,
  }

  componentDidMount() {
    const gql = `{
      KEEP: account(id: "0x0000000000000000000000000000000000000000")
      {
        keepBalance
      }
    }`

    query(gql).then(data => {
      this.setState({
        loading: false,
        KEEP: numberWithCommas(parseInt(data.KEEP.keepBalance)),
      })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    return this.state.loading ? 'Loading...' : this.state.KEEP
  }
}

class TbtcTotalSupply extends React.Component {
  state = {
      totalSupply: []
  }

  totalSupplyQuery(blocks) {
    let queryString = 'query blocks {'
    queryString += blocks.map(
      (block) => `
        t${block.timestamp}: account(id: "0x0000000000000000000000000000000000000000", block: { number: ${block.number} }) {
          tbtcBalance
        }
      `
    )

    queryString += '}'
    return queryString
  }

  async getTotalSupplies() {
    let blocks
    try {
      blocks = await blocksSinceTbtcEpoch(24)
      // catch failing case
      if (!blocks || blocks.length === 0) {
          return []
      }

      let result = await splitQuery(this.totalSupplyQuery, keanuClient, [], blocks, 500)

      // format result
      let values = []
      for (var row in result) {
        let timestamp = row.split('t')[1]
        let totalSupply = parseFloat(result[row]?.tbtcBalance)
        if (timestamp) {
          values.push({
            timestamp,
            totalSupply
          })
        }
      }

      //Sort values
      values.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      return values
    } catch (e) {
      console.error('error fetching blocks', e)
      return []
    }
  }

  componentDidMount() {
    this.getTotalSupplies().then(data => {
      this.setState({
        totalSupply: data
      })
    }).catch(e => {
      console.error(e)
    })
  }

  totalSupplyChart() {
    const options = {
      xAxis: {
          type: 'category',
          data: this.state.totalSupply.map(item => formatDate(item.timestamp, 'YYYY-MM-DD HH:mm')),
          axisLabel: {
              formatter: function (value, _idx) {
                  return formatDate(dayjs(value).unix(), 'MMMM D')
              }
          }
      },
      yAxis: [
        {
          name: 'TBTC',
          type: 'value',
          axisLabel: {
              formatter: function (value, _idx) {
                return abbreviateNumber(value)
              }
          },
          position: 'left',
          axisLine: {
              show: true,
              lineStyle: {
                  color: chartBlue
              }
          }
        },
        {
          type: 'value',
          axisLabel: {
              formatter: function (value, _idx) {
                return abbreviateNumber(value)
              }
          }
        }
      ],
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      series: [{
          name: 'TBTC Total Supply',
          data: this.state.totalSupply.map(item => item.totalSupply.toFixed(2)),
          type: 'line',
          lineStyle: {color: chartBlue}
        }
      ]
    }
    return <ReactECharts 
        loadingOption={loadingOption} 
        showLoading={this.state.totalSupply.length === 0} 
        option={options} 
      />
  }

  render() {
    return (
      <div className="tbtc-total-supply">
        {this.totalSupplyChart()}
      </div>
    )
  }
}

class KeepCirculatingSupply extends React.Component {
  state = {
      loading: true,
      supply: 0
  }

  async getSupply() {
      axios.get('https://knowyourdefifunc.azurewebsites.net/api/KeanuMiscFunc?module=keepcirculatingsupply')
      .then((response) => {
          this.setState({
              loading: false,
              supply: parseFloat(parseFloat(response.data.data.keep_circulating_supply).toFixed(2))
          })
      })
      .catch(e => {
        console.error(e)
      })
  }

  componentDidMount() {
      this.getSupply()
  }

  render() {
      return this.state.loading ? 'Loading...' : numberWithCommas(this.state.supply)
  }
}

class NuCirculatingSupply extends React.Component {
  state = {
      loading: true,
      supply: 0
  }

  async getSupply() {
      axios.get('https://knowyourdefifunc.azurewebsites.net/api/KeanuMiscFunc?module=nucirculatingsupply')
      .then((response) => {
          this.setState({
              loading: false,
              supply: parseFloat(parseFloat(response.data.data.nu_circulating_supply).toFixed(2))
          })
      })
      .catch(e => {
        console.error(e)
      })
  }

  componentDidMount() {
      this.getSupply()
  }

  render() {
      return this.state.loading ? 'Loading...' : numberWithCommas(this.state.supply)
  }
}

export {TbtcCurrentTotalSupply}
export {TbtcTotalSupply}
export {KeepCurrentTotalSupply}
export {NuCurrentTotalSupply}
export {KeepCirculatingSupply}
export {NuCirculatingSupply}