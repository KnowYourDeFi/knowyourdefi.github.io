import React from 'react'
import ReactECharts from 'echarts-for-react'
import {formatDate} from '../../utils/Timestamps'
import {query, liquityClient, last7DayBlocks, blocksSinceLiquityEpoch, splitQuery} from '../LiquityData'
import dayjs from 'dayjs'
import {chartRed, chartGreen, chartBlue} from '../../utils/ChartColors'
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

export {LusdCurrentTotalSupply}
