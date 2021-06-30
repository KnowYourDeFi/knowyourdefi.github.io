import React from 'react'
import ColorProgressBar from '../../widget/ColorProgressBar'
import {query} from '../LiquityData'

class CollateralRatio extends React.Component {

  state = {
    loading: true,
    ratio: 0
  }

  componentDidMount() {
      const gql = `
      {
        systemStates(first:1, orderBy: sequenceNumber, orderDirection:desc)
          {
            totalCollateralRatio
          }
      }
      `
      //Get Uniswap V2 price
      query(gql).then(data => {
          let arr = data.systemStates
          if (!arr || arr.length === 0) return
          let ratio = arr[0].totalCollateralRatio
          this.setState({
            loading: false,
            ratio: parseFloat((ratio * 100).toFixed(2))
          })
      }).catch(e => {
          console.error(e)
      })
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    return <ColorProgressBar
      progress={this.state.ratio}
      range={[{
        size: 150,
        color: 'rgb(250, 127, 102)',
        name: null,
      }, {
        size: 50,
        color: 'rgb(247, 230, 80)',
        name: null,
      }, {
        size: 300,
        color: 'rgb(175, 226, 76)',
        name: null,
      }]}
    />
  }
}

export default CollateralRatio;
