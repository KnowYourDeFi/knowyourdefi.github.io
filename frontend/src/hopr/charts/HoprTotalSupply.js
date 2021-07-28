import React from 'react'
import { numberWithCommas } from '../../utils/NumberUtils'

class HoprTotalSupply extends React.Component {
  state = {
    loading: true,
    HOPR: 0
  }

  componentDidMount() {
    this.setState({
      loading: false,
      // Fixed amount, 1 BN.
      HOPR: numberWithCommas(1000000000),
    })
  }

  render() {
    return this.state.loading ? 'Loading...' : this.state.HOPR
  }
}

export default HoprTotalSupply