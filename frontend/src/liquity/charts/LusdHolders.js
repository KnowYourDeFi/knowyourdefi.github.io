/*
 * 文件说明: 展示协议数据，请求失败时仅显示当前组件的无数据状态。
 */
import React from 'react'
import { gql } from '@apollo/client'
import {liquityClient} from '../LiquityData'

class LusdHolders extends React.Component {
    state = {
        loading: true,
        holders: []
    }

    async fetchData() {
        const hodlerQuery = `
        query tokenBalances($skip: Int!) {
            tokenBalances(first:1000, skip:$skip, where:{balance_gt:0, token_starts_with:"0x5f98805a4e8be255a32880fdec7f6728c6568ba0"})
            {
              id
            }
          }
        `

        try {
          let skip = 0
          let allResults = []
          let found = false
          while (!found) {
            let result = await liquityClient.query({
              query: gql(hodlerQuery),
              variables: {
                skip: skip
              },
              fetchPolicy: 'cache-first',
            })
            allResults = allResults.concat(result.data.tokenBalances)
            if (result.data.tokenBalances.length < 1000) {
              found = true
            } else {
              skip += 1000
            }
          }
          return allResults
        } catch (e) {
          console.error(e)
          throw e
        }
    }

    componentDidMount() {
        this.fetchData().then(data => {
            this.setState({
              loading: false,
              holders: data
            })
        }).catch(e => {
            console.error(e)
            this.setState({ failed: true })
        })
    }

    render() {
      if (this.state.failed) return 'No data'
        return this.state.loading ? 'Loading...' : this.state.holders.length
    }
}

export default LusdHolders
