import React from 'react'
import { numberWithCommas } from '../../utils/NumberUtils'
import {query, nuClinet} from '../KeanuData'

class NuNodes extends React.Component {
  state = {
    loading: true,
    NuNodes: 0,
  }

  componentDidMount() {
    const gql = `{
      NuNodes: periods(first:1, orderBy:id, orderDirection:desc)
      {
        activeStakers
      }
    }`

    query(gql, nuClinet).then(data => {
      this.setState({
        loading: false,
        NuNodes: numberWithCommas(data.NuNodes[0].activeStakers),
      })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    return this.state.loading ? 'Loading...' : this.state.NuNodes
  }
}

export { NuNodes }

