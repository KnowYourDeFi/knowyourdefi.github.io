import React from 'react'
import { gql } from '@apollo/client'
import {liquityClient} from '../LiquityData'

class LqtyHolders extends React.Component {
    state = {
        loading: true,
        holders: []
    }

    async fetchData() {
        const hodlerQuery = `
        query tokenBalances($skip: Int!) {
            tokenBalances(first:1000, skip:$skip, where:{balance_gt:0, token_starts_with:"0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d"})
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
          console.log(e)
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
        return (
            <div className="lqty-holders">
              <p>
                  {this.state.loading ? 'Loading...' : this.state.holders.length}
              </p>
            </div>
        )
    }
}

export default LqtyHolders