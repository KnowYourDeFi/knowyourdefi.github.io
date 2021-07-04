import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../../utils/Timestamps'
import {liquityClient, last7DayBlocks, splitQuery} from '../LiquityData'
import dayjs from 'dayjs'
import { abbreviateNumber } from '../../utils/NumberUtils'
import {loadingOption} from '../../utils/ChartUtils'

class StakingLUSD extends React.Component {
    state = {
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
              if (!arr || arr.length === 0) continue
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
            console.error('error fetching blocks', e)
            return []
        }
    }

    componentDidMount() {
        this.getRecentStaking().then(data => {
            this.setState({
                data: data
            })
        }).catch(e => {
            console.error(e)
        })
    }

    stakingChart() {
        const options = {
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
      return <ReactECharts 
        loadingOption={loadingOption} 
        showLoading={this.state.data.length === 0} 
        option={options} 
      />
    }

    render() {
        return (
          <div className="recent-staking-lusd">
            {this.stakingChart()}
          </div>
        )
    }
}

export {StakingLUSD}
