import React from 'react'
import query from '../data/liquity'

class TotalSupply extends React.Component {
  state = {
    loading: true,
    LUSD: 0,
    LQTY: 0,
  }

  componentDidMount() {
    const gql = `{
      LUSD: token(id: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0")
      {
        name
        symbol
        totalSupply
      }
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
    //     },
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
        LUSD: data.LUSD.totalSupply,
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
          LUSD TotalSupply: {this.state.loading ? 'Loading...' : this.state.LUSD}
        </p>
        <p>
          LQTY TotalSupply: {this.state.loading ? 'Loading...' : this.state.LQTY}
        </p>
      </div>
    )
  }
}

export default TotalSupply
