import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../../utils/Timestamps'
import {query, liquityClient, last7DayBlocks, splitQuery} from '../LiquityData'
import dayjs from 'dayjs'
import { abbreviateNumber } from '../../utils/NumberUtils'

class CurrentTroveNumber extends React.Component {
    state = {
        loading: true,
        number: 0
    }

    componentDidMount() {
        const gql = `{
            global(id:"only")
            {
                numberOfOpenTroves
            }
        }`
        
        query(gql).then(data => {
          this.setState({
            loading: false,
            number: data.global.numberOfOpenTroves,
          })
        }).catch(e => {
          console.error(e)
        })
      }
    
      render() {
        return (
          <div className="current-trove-number">
            <p>
              Number of troves: {this.state.loading ? 'Loading...' : this.state.number}
            </p>
          </div>
        )
      }
}

class RecentTroveNumbers extends React.Component {
    state = {
        loading: true,
        data: []
    }

    troveNumbersQuery(blocks) {
        let queryString = 'query blocks {'
        queryString += blocks.map(
          (block) => `
            t${block.timestamp}: global(id:"only", block: { number: ${block.number} }) { 
                numberOfOpenTroves
            }
          `
        )
      
        queryString += '}'
        return queryString
    }

    async getRecentNumbers() {
        let blocks
        try {
            blocks = await last7DayBlocks()
            // catch failing case
            if (!blocks || blocks.length === 0) {
                return []
            }

            let result = await splitQuery(this.troveNumbersQuery, liquityClient, [], blocks, 500)

            // format result
            let values = []
            for (var row in result) {
              let timestamp = row.split('t')[1]
              let number = result[row]?.numberOfOpenTroves
              if (timestamp) {
                values.push({
                  timestamp,
                  number,
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
        this.getRecentNumbers().then(data => {
            this.setState({
                loading: false,
                data: data
            })
        }).catch(e => {
            console.error(e)
        })
    }

    numberChart() {
      if (this.state.loading) {
        return <p>Loading...</p>
      }
      const options = {
          title: {
              text: 'Trove numbers (7d)'
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
              name: 'Trove number',
              data: this.state.data.map(item => item.number),
              type: 'line'
          }]
      }
      return <ReactECharts option={options} />
    }

    render() {
        return (
          <div className="recent-trove-numbers">
            {this.numberChart()}
          </div>
        )
    }
}

export {CurrentTroveNumber}
export {RecentTroveNumbers}