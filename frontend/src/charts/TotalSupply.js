import React from 'react'
import query from '../data/liquity'

class TotalSupply extends React.Component {
  state = {
    loading: true,
    totalSupply: 0,
  }

  componentWillMount() {
    const ql = `{
      token(id: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0")
      {
        name
        symbol
        totalSupply
      }
    }`
    // {
    //   data: {
    //     token: {
    //       __typename: 'Token',
    //       name: 'LUSD Stablecoin',
    //       symbol: 'LUSD',
    //       totalSupply: '779563343243458426722743258'
    //     }
    //   },
    //   loading: false,
    //   networkStatus: 7
    // }
    query(ql).then(data => {
      console.log(`data = ${data}`)
      this.setState({
        loading: false,
        totalSupply: data.data.token.totalSupply,
      })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    return (
      <div className="total-supply">
        <p>
          TotalSupply: {this.state.loading ? 'Loading...' : this.state.totalSupply}
        </p>
      </div>
    )
  }
}

export default TotalSupply
