/*
 * 文件说明: 展示协议数据，请求失败时仅显示当前组件的无数据状态。
 */
import React from 'react'
import { gql } from '@apollo/client'
import {hoprClient, hoprXdaiClient} from '../HoprData'

class HoprHolders extends React.Component {
    state = {
        loading: true,
        holders: []
    }

    async fetchData() {
        const holderQuery = `
        query accounts($skip: Int!) {
            accounts(first:1000, skip:$skip, where:{HoprBalance_gt:0, id_not:"0x0000000000000000000000000000000000000000"})
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
            let result = await hoprClient.query({
              query: gql(holderQuery),
              variables: {
                skip: skip
              },
              fetchPolicy: 'cache-first',
            })
            allResults = allResults.concat(result.data.accounts)
            if (result.data.accounts.length < 1000) {
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

class HoprXdaiHolders extends React.Component {
    state = {
        loading: true,
        holders: []
    }

    async fetchData() {
        const holderQuery = `
        query accounts($skip: Int!) {
            accounts(first:1000, skip:$skip, where:{totalBalance_gt:0, id_not:"0x0000000000000000000000000000000000000000"})
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
            let result = await hoprXdaiClient.query({
              query: gql(holderQuery),
              variables: {
                skip: skip
              },
              fetchPolicy: 'cache-first',
            })
            allResults = allResults.concat(result.data.accounts)
            if (result.data.accounts.length < 1000) {
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

export {HoprHolders}
export {HoprXdaiHolders}
