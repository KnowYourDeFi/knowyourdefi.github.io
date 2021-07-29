import React from 'react'
import { gql } from '@apollo/client'
import { keanuClient } from '../KeanuData'

class TbtcHolders extends React.Component {
    state = {
        loading: true,
        holders: []
    }

    async fetchData() {
        const holderQuery = `
        query accounts($skip: Int!) {
            accounts(first:1000, skip:$skip, where:{tbtcBalance_gt:0, id_not:"0x0000000000000000000000000000000000000000"})
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
            let result = await keanuClient.query({
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
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : this.state.holders.length
    }
}

class NuHolders extends React.Component {
    state = {
        loading: true,
        holders: []
    }

    async fetchData() {
        const holderQuery = `
        query accounts($lastBalance: String!) {
            accounts(first:1000,orderBy:nuBalance,orderDirection:asc,where:{nuBalance_gt:$lastBalance, id_not:"0x0000000000000000000000000000000000000000"})
            {
              id
              nuBalance
            }
          }
        `

        try {
          let lastBalance = '0'
          let allResults = []
          let found = false
          while (!found) {
            let result = await keanuClient.query({
              query: gql(holderQuery),
              variables: {
                lastBalance: lastBalance
              },
              fetchPolicy: 'cache-first',
            })
            allResults = allResults.concat(result.data.accounts)
            if (result.data.accounts.length < 1000) {
              found = true
            } else {
               lastBalance = result.data.accounts[999].nuBalance
            }
          }
          return allResults
        } catch (e) {
          console.error(e)
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
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : this.state.holders.length
    }
}

class KeepHolders extends React.Component {
    state = {
        loading: true,
        holders: []
    }

    async fetchData() {
        const holderQuery = `
        query accounts($lastBalance: String!) {
            accounts(first:1000,orderBy:keepBalance,orderDirection:asc,where:{keepBalance_gt:$lastBalance, id_not:"0x0000000000000000000000000000000000000000"})
            {
              id
              keepBalance
            }
          }
        `

        try {
          let lastBalance = '0'
          let allResults = []
          let found = false
          while (!found) {
            let result = await keanuClient.query({
              query: gql(holderQuery),
              variables: {
                lastBalance: lastBalance
              },
              fetchPolicy: 'cache-first',
            })
            allResults = allResults.concat(result.data.accounts)
            if (result.data.accounts.length < 1000) {
              found = true
            } else {
               lastBalance = result.data.accounts[999].keepBalance
            }
          }
          return allResults
        } catch (e) {
          console.error(e)
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
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : this.state.holders.length
    }
}

export {TbtcHolders}
export {NuHolders}
export {KeepHolders}
