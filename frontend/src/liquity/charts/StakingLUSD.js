import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../utility/Timestamps'
import {liquityClient, last7DayBlocks, splitQuery} from '../LiquityData'
import dayjs from 'dayjs'
import {abbreviateNumber} from '../utility/StringFormatter'

class StakingLUSD extends React.Component {
    state = {
        loading: true,
        data: []
    }

    stakingQuery(blocks) {
        let queryString = 'query blocks {'
        queryString += blocks.map(
          (block) => `
            t${block.timestamp}: systemStates(block: { number: ${block.number} }, first:1, orderBy: sequenceNumber, orderDirection:desc) { 
                tokensInStabilityPool
            }
          `
        )
      
        queryString += '}'
        return queryString
    }

    async getRecentStaking() {
        let blocks
        try {
            blocks = await last7DayBlocks()
            // catch failing case
            if (!blocks || blocks.length === 0) {
                return []
            }

            let result = await splitQuery(this.stakingQuery, liquityClient, [], blocks, 500)

            // format result
            let values = []
            for (var row in result) {
              let timestamp = row.split('t')[1]
              let arr = result[row]
              if (!arr) continue
              let stake = parseFloat(arr[0].tokensInStabilityPool)
              if (timestamp) {
                values.push({
                  timestamp,
                  stake,
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
        this.getRecentStaking().then(data => {
            this.setState({
                loading: false,
                data: data
            })
        }).catch(e => {
            console.error(e)
        })
    }

    stakingChart() {
        const options = {
            title: {
                text: 'Staking LUSD (7d)'
            },
            xAxis: {
                type: 'category',
                data: this.state.data.map(item => formatDate(item.timestamp, 'YYYY-MM-DD HH:mm')),
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
                name: 'Staking',
                data: this.state.data.map(item => item.stake.toFixed(2)),
                type: 'line'
            }]
        }
        return <ReactECharts option={options} />
    }

    chart() {
        if (this.state.loading) {
            return <p>Loading...</p>
          } else {
            return this.stakingChart()
          }
    }

    render() {
        return (
          <div className="recent-staking-lusd">
            {this.chart()}
          </div>
        )
    }
}

export {StakingLUSD}