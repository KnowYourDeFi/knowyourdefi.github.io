import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../Timestamps'
import {query, liquityClient, last7DayBlocks, splitQuery} from '../LiquityData'
import dayjs from 'dayjs'

class CurrentTVL extends React.Component {
    state = {
        loading: true,
        tvl: 0
    }

    componentDidMount() {
        const gql = `{
            systemStates(first:1, orderBy: sequenceNumber, orderDirection:desc)
              {
                totalCollateral
                price
              }
            }`
        
        query(gql).then(data => {
            const arr = data.systemStates
            const totalCollateral = parseFloat(arr[0].totalCollateral)
            const ethPrice = parseFloat(arr[0].price)
          this.setState({
            loading: false,
            tvl: totalCollateral * ethPrice
          })
        }).catch(e => {
          console.error(e)
        })
      }
    
      render() {
        return (
          <div className="current-trove-number">
            <p>
              Total Value Locked: {this.state.loading ? 'Loading...' : this.state.tvl}
            </p>
          </div>
        )
      }
}


export {CurrentTVL}