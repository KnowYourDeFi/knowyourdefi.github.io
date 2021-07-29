import React from 'react'
import {query, uniV2Client} from '../../liquity/LiquityData'
import { sushiClient } from '../KeanuData'

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

class NUPriceV2 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pair(id:"0x3a8afc58b70b34a0a5615d3a5ffe623ca1fa92b8")
            {
                token1Price
            }
        }
        `

        //Get Uniswap V2 price
        query(gql, uniV2Client).then(data => {
            const tokenPrice = data.pair.token1Price
            this.setState({
              loading: false,
              price: tokenPrice
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : parseFloat(this.state.price).toFixed(4) + ' ETH'
    }
}

class NUPriceSushi extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pair(id:"0x04444d365324134e58104b1d874d00dc68dcea53")
            {
                token1Price
            }
        }
        `

        //Get Sushiswap price
        query(gql, sushiClient).then(data => {
            const tokenPrice = data.pair.token1Price
            this.setState({
              loading: false,
              price: tokenPrice
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : parseFloat(this.state.price).toFixed(4) + ' ETH'
    }
}

class KEEPPriceV2 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pair(id:"0xe6f19dab7d43317344282f803f8e8d240708174a")
            {
                token1Price
            }
        }
        `

        //Get Uniswap V2 price
        query(gql, uniV2Client).then(data => {
            const tokenPrice = data.pair.token1Price
            this.setState({
              loading: false,
              price: tokenPrice
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : parseFloat(this.state.price).toFixed(4) + ' ETH'
    }
}

export {TBTCPriceV2}
export {NUPriceV2}
export {NUPriceSushi}
export {KEEPPriceV2}