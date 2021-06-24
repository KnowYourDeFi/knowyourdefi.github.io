import React from 'react'
import query from '../data/liquity'

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
        LUSD: data.LUSD.totalSupply,
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
      </div>
    )
  }
}

export default LusdTotalSupply
