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
    console.log('this.state.ratio...........', this.state)
    return <ColorProgressBar
      progress={this.state.ratio}
      descriptions={['Killed', 'High Risk', 'Master', 'Healthy']}
    />
  }
}

export default CollateralRatio;
