import React from 'react'
import {query, uniV2Client, uniV3Client} from '../../liquity/LiquityData'

export async function queryTBTCPriceV2() {
    const gql = `
        {
            pair(id:"0x854056fd40c1b52037166285b2e54fee774d33f6")
            {
              token1Price
            }
        }
        `
        //Get Uniswap V2 price
        let data = await query(gql, uniV2Client)
        return  data.pair.token1Price
}

class TBTCPriceV2 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        queryTBTCPriceV2().then(price => {
            this.setState({
              loading: false,
              price: price
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return this.state.loading ? 'Loading...' :  parseFloat(this.state.price).toFixed(2) + ' ETH'
    }
}

class HOPRPriceV3 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pool(id:"0x87986ae1e99f99da1f955d16930dc8914ffbed56")
            {
                token1Price
            }
        }
        `

        //Get Uniswap V3 price
        query(gql, uniV3Client).then(data => {
            const tokenPrice = data.pool.token0Price
            this.setState({
              loading: false,
              price: tokenPrice
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : 'ETH $' + parseFloat(this.state.price).toFixed(2)
    }
}

export {TBTCPriceV2}
export {HOPRPriceV3} 