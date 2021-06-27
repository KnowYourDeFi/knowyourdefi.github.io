import React from 'react'
import { numberWithCommas } from '../../utils/NumberUtils'
import { query } from '../LiquityData'

class LusdTotalSupply extends React.Component {
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
    // {
    //   "data": {
    //     "LUSD": {
    //       "name": "LUSD Stablecoin",
    //       "symbol": "LUSD",
    //       "totalSupply": "782143060978094386401558948"
    //     }
    //   }
    // }
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

export default LusdTotalSupply
