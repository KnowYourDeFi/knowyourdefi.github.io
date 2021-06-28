import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../../utils/Timestamps'
import {liquityClient, last7DayBlocks, blocksSinceLiquityEpoch, splitQuery} from '../LiquityData'
import dayjs from 'dayjs'
import {chartRed, chartGreen, chartBlue} from '../../utils/ChartColors'
import { abbreviateNumber } from '../../utils/NumberUtils'

class TVL extends React.Component {
    state = {
        loading: true,
        tvl: []
    }

    tvlQuery(blocks) {
      let queryString = 'query blocks {'
      queryString += blocks.map(
        (block) => `
          t${block.timestamp}: systemStates(block: { number: ${block.number} }, first:1, orderBy: sequenceNumber, orderDirection:desc) { 
            totalCollateral
            price
          }
        `
      )
    
      queryString += '}'
      return queryString
    }
    
    async getRecentTVLs() {
      let blocks
      try {
        blocks = await blocksSinceLiquityEpoch()
        // catch failing case
        if (!blocks || blocks.length === 0) {
            return []
        }

        let result = await splitQuery(this.tvlQuery, liquityClient, [], blocks, 500)

        // format result
        let values = []
        for (var row in result) {
          let timestamp = row.split('t')[1]
          let arr = result[row]
          if (!arr || arr.length === 0) continue
          let totalCollateral = parseFloat(arr[0].totalCollateral)
          let price = parseFloat(arr[0].price)
          if (timestamp) {
            values.push({
              timestamp,
              totalCollateral,
              price,
            })
          }
        }

        //Sort values
        values.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
        return values
      } catch (e) {
        console.log(e)
        console.log('error fetching blocks')
        return []
      }
    }

    componentDidMount() {
      this.getRecentTVLs().then(data => {
        this.setState({
          loading: false,
          tvl: data
        })
      }).catch(e => {
        console.error(e)
      })
    }

    tvlChart() {
      if (this.state.loading) {
        return <p>Loading...</p>
      }
      const options = {
        xAxis: {
            type: 'category',
            data: this.state.tvl.map(item => formatDate(item.timestamp, 'YYYY-MM-DD HH:mm')),
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
            name: 'USD',
            type: 'value',
            axisLabel: {
                formatter: function (value, _idx) {
                  return abbreviateNumber(value)
                }
            },
            position: 'right',
            axisLine: {
                show: true,
                lineStyle: {
                    color: chartRed
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
            name: 'TVL(ETH)',
            data: this.state.tvl.map((item) => {
              return {
                value: item.totalCollateral.toFixed(2), 
                itemStyle: {color: chartBlue}
              }
            }),
            type: 'line',
            lineStyle: {color: chartBlue}
          },
          {
            name: 'TVL(USD)',
            data: this.state.tvl.map((item) => {
              return {
                value: (item.totalCollateral * item.price).toFixed(2), 
                itemStyle: {color: chartRed}
              }
            }),
            type: 'line',
            lineStyle: {color: chartRed},
            yAxisIndex: 1
          }
        ]
      }
      return <ReactECharts option={options} />
    }

    render() {
      return (
        <div className="tvl">
          {this.tvlChart()}
        </div>
      )
    }
}

class TVL7DayChange extends React.Component {
  state = {
      loading: true,
      tvlChanges: []
  }

  recentTVLQuery(blocks) {
    let queryString = 'query blocks {'
    queryString += blocks.map(
      (block) => `
        t${block.timestamp}: systemStates(block: { number: ${block.number} }, first:1, orderBy: sequenceNumber, orderDirection:desc) { 
          totalCollateral
          price
        }
      `
    )
  
    queryString += '}'
    return queryString
  }

  async getRecentTVLs() {
    let blocks
    try {
      blocks = await last7DayBlocks()
      // catch failing case
      if (!blocks || blocks.length === 0) {
          return []
      }

      let result = await splitQuery(this.recentTVLQuery, liquityClient, [], blocks, 500)

      // format result
      let values = []
      for (var row in result) {
        let timestamp = row.split('t')[1]
        let arr = result[row]
        if (!arr || arr.length === 0) continue
        let totalCollateral = parseFloat(arr[0].totalCollateral)
        let price = parseFloat(arr[0].price)
        if (timestamp) {
          values.push({
            timestamp,
            totalCollateral,
            price,
          })
        }
      }

      //Sort values
      values.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      return values
    } catch (e) {
      console.log(e)
      console.log('error fetching blocks')
      return []
    }
  }

  componentDidMount() {
    this.getRecentTVLs().then(data => {
      let tvlChanges = []
      for (let i = 1; i < data.length; i ++) {
        const timestamp = data[i].timestamp
        const change = data[i].totalCollateral - data[i-1].totalCollateral
        tvlChanges.push({
          timestamp,
          change
        })
      }
      this.setState({
        loading: false,
        tvlChanges: tvlChanges
      })
    }).catch(e => {
      console.error(e)
    })
  }

  tvlChangeChart() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    const options = {
      xAxis: {
          type: 'category',
          data: this.state.tvlChanges.map(item => formatDate(item.timestamp, 'YYYY-MM-DD HH:mm')),
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
          name: 'ETH change',
          data: this.state.tvlChanges.map((item) => {
            return {
              value: item.change.toFixed(2), 
              itemStyle: {color: item.change >= 0 ? chartGreen : chartRed}
            }
          }),
          type: 'bar'
        }
      ]
    }
    return <ReactECharts option={options} />
  }

  render() {
    return (
      <div className="tvl-7d-changes">
        {this.tvlChangeChart()}
      </div>
    )
  }
}

export {TVL}
export {TVL7DayChange}