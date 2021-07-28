import React from 'react'
import {query, uniV2Client, uniV3Client} from '../../liquity/LiquityData'

export async function queryHOPRPriceV2() {
    const gql = `
        {
            pair(id:"0x92c2fc5f306405eab0ff0958f6d85d7f8892cf4d")
            {
              token0Price
            }
        }
        `
        //Get Uniswap V2 price
        let data = await query(gql, uniV2Client)
        return  data.pair.token0Price
}

class HOPRPriceV2 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        queryHOPRPriceV2().then(price => {
            this.setState({
              loading: false,
              price: price
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return this.state.loading ? 'Loading...' : 'USD $' + parseFloat(this.state.price).toFixed(2)
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
                token0Price
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
        return this.state.loading ? 'Loading...' : 'USD $' + parseFloat(this.state.price).toFixed(2)
    }
}

export {HOPRPriceV2}
export {HOPRPriceV3}