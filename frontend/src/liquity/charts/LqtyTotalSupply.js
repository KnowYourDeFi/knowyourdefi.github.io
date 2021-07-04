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
    })
  }

  render() {
    return this.state.loading ? 'Loading...' : this.state.LQTY
  }
}

export default LqtyTotalSupply
