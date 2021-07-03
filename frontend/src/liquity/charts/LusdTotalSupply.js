import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../../utils/Timestamps'
import {query, liquityClient, last7DayBlocks, blocksSinceLiquityEpoch, splitQuery} from '../LiquityData'
import dayjs from 'dayjs'
import {chartRed, chartGreen, chartBlue, loadingOption} from '../../utils/ChartUtils'
import { numberWithCommas, abbreviateNumber } from '../../utils/NumberUtils'

class LusdCurrentTotalSupply extends React.Component {
  state = {
    loading: true,
    LUSD: 0,
  }

  componentDidMount() {
    const gql = `{
      LUSD: token(id: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0")
      {
        name
        symbol
        totalSupply
      }
    }`

    query(gql).then(data => {
      this.setState({
        loading: false,
        LUSD: numberWithCommas((data.LUSD.totalSupply / 1e18).toFixed(2)),
      })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    return this.state.loading ? 'Loading...' : this.state.LUSD
  }
}

class LusdTotalSupply extends React.Component {
  state = {
      totalSupply: []
  }

  totalSupplyQuery(blocks) {
    let queryString = 'query blocks {'
    queryString += blocks.map(
      (block) => `
        t${block.timestamp}: token(id: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0", block: { number: ${block.number} }) {
          totalSupply
        }
      `
    )

    queryString += '}'
    return queryString
  }

  async getTotalSupplies() {
    let blocks
    try {
      blocks = await blocksSinceLiquityEpoch(24)
      // catch failing case
      if (!blocks || blocks.length === 0) {
          return []
      }

      let result = await splitQuery(this.totalSupplyQuery, liquityClient, [], blocks, 500)

      // format result
      let values = []
      for (var row in result) {
        let timestamp = row.split('t')[1]
        let totalSupply = parseFloat(result[row]?.totalSupply) / 1e18
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
          name: 'ETH',
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
          name: 'LUSD Total Supply',
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
      <div className="lusd-total-supply">
        {this.totalSupplyChart()}
      </div>
    )
  }
}

class Lusd7DayMintBurn extends React.Component {
  state = {
      totalSupplyChanges: []
  }

  totalSupplyQuery(blocks) {
    let queryString = 'query blocks {'
    queryString += blocks.map(
      (block) => `
        t${block.timestamp}: token(id: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0", block: { number: ${block.number} }) {
          totalSupply
        }
      `
    )

    queryString += '}'
    return queryString
  }

  async getRecentTotalSupplies() {
    let blocks
    try {
      blocks = await last7DayBlocks()
      // catch failing case
      if (!blocks || blocks.length === 0) {
          return []
      }

      let result = await splitQuery(this.totalSupplyQuery, liquityClient, [], blocks, 500)

      // format result
      let values = []
      for (var row in result) {
        let timestamp = row.split('t')[1]
        let totalSupply = parseFloat(result[row]?.totalSupply) / 1e18
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
    this.getRecentTotalSupplies().then(data => {
      let totalSupplyChanges = []
      for (let i = 1; i < data.length; i ++) {
        const timestamp = data[i].timestamp
        const change = data[i].totalSupply - data[i-1].totalSupply
        totalSupplyChanges.push({
          timestamp,
          change
        })
      }
      this.setState({
        totalSupplyChanges: totalSupplyChanges
      })
    }).catch(e => {
      console.error(e)
    })
  }

  totalSupplyChangesChart() {
    const options = {
      xAxis: {
          type: 'category',
          data: this.state.totalSupplyChanges.map(item => formatDate(item.timestamp, 'YYYY-MM-DD HH:mm')),
          axisLabel: {
              formatter: function (value, _idx) {
                  return formatDate(dayjs(value).unix(), 'MMMM D')
              }
          }
      },
      yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value, _idx) {
              return abbreviateNumber(value)
            }
          }
      },
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
          name: 'Mint/Burn',
          data: this.state.totalSupplyChanges.map((item) => {
            return {
              value: item.change.toFixed(2),
              itemStyle: {color: item.change >= 0 ? chartGreen : chartRed}
            }
          }),
          type: 'bar'
        }
      ]
    }
    return <ReactECharts 
        loadingOption={loadingOption} 
        showLoading={this.state.totalSupplyChanges.length === 0} 
        option={options} 
      />
  }

  render() {
    return (
      <div className="lusd-total-supply">
        {this.totalSupplyChangesChart()}
      </div>
    )
  }
}

export {LusdCurrentTotalSupply}
export {LusdTotalSupply}
export {Lusd7DayMintBurn}
