import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../../utils/Timestamps'
import { uniV2Client } from '../../liquity/LiquityData'
import { blocksSinceHoprEpoch, splitQuery } from '../HoprData'
import dayjs from 'dayjs'
import { chartBlue } from '../../utils/ChartUtils'
import { abbreviateNumber } from '../../utils/NumberUtils'

// Use Uniswap V2 for now.
class HoprPriceHistory extends React.Component {
  state = {
      loading: true,
      hoprPrices: []
  }

  hoprPriceQuery(blocks) {
    let queryString = 'query blocks {'
    
    queryString += blocks.map(
      (block) => `
        t${block.timestamp}: pair(id: "0x92c2fc5f306405eab0ff0958f6d85d7f8892cf4d", block: { number: ${block.number} }) {
          token0Price
        }
      `
    )

    queryString += '}'
    return queryString
  }

  async getHoprPrices() {
    let blocks
    try {
      blocks = await blocksSinceHoprEpoch(24)
      // catch failing case
      if (!blocks || blocks.length === 0) {
          return []
      }

      let result = await splitQuery(this.hoprPriceQuery, uniV2Client, [], blocks, 500)

      // format result
      let values = []
      for (var row in result) {
        let timestamp = row.split('t')[1]
        let hoprPrice = parseFloat(result[row]?.token0Price)
        if (timestamp) {
          values.push({
            timestamp,
            hoprPrice
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
    this.getHoprPrices().then(data => {
      this.setState({
        loading: false,
        hoprPrices: data
      })
    }).catch(e => {
      console.error(e)
    })
  }

  hoprPriceHistoryChart() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    const options = {
      xAxis: {
          type: 'category',
          data: this.state.hoprPrices.map(item => formatDate(item.timestamp, 'YYYY-MM-DD HH:mm')),
          axisLabel: {
              formatter: function (value, _idx) {
                  return formatDate(dayjs(value).unix(), 'MMMM D')
              }
          }
      },
      yAxis: [
        {
          name: 'USD',
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
          name: 'HOPR Price History',
          data: this.state.hoprPrices.map(item => item.hoprPrice.toFixed(2)),
          type: 'line',
          lineStyle: {color: chartBlue}
        }
      ]
    }
    return <ReactECharts option={options} />
  }

  render() {
    return (
      <div className="hopr-price-history">
        {this.hoprPriceHistoryChart()}
      </div>
    )
  }
}

export {HoprPriceHistory}

