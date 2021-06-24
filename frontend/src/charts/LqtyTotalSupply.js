import React from 'react'
import query from '../data/liquity'

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
    // {
    //   "data": {
    //     "LQTY": {
    //       "name": "LQTY",
    //       "symbol": "LQTY",
    //       "totalSupply": "100000000000000000000000000"
    //     }
    //   }
    // }
    query(gql).then(data => {
      this.setState({
        loading: false,
        LQTY: data.LQTY.totalSupply,
      })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    return (
      <div className="total-supply">
        <p>
          LQTY TotalSupply: {this.state.loading ? 'Loading...' : this.state.LQTY}
        </p>
      </div>
    )
  }
}

export default LqtyTotalSupply
