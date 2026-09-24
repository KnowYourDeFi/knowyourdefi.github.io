/*
 * 文件说明: 展示协议数据，请求失败时仅显示当前组件的无数据状态。
 */
import React from 'react'
import { numberWithCommas } from '../../utils/NumberUtils'
import { query } from '../LiquityData'

class LqtyTotalSupply extends React.Component {
  state = {
    loading: true,
    LQTY: 0,
  }

  componentDidMount() {
    const gql = `{
      LQTY: token(id: "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d")
      {
        name
        symbol
        totalSupply
      }
    }`
    
    query(gql).then(data => {
      this.setState({
        loading: false,
        LQTY: numberWithCommas((data.LQTY.totalSupply / 1e18).toFixed(2)),
      })
    }).catch(e => {
      console.error(e)
      this.setState({ failed: true })
    })
  }

  render() {
    if (this.state.failed) return 'No data'
    return this.state.loading ? 'Loading...' : this.state.LQTY
  }
}

export default LqtyTotalSupply
