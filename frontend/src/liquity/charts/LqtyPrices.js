import React from 'react'
import {query, uniV2Client, uniV3Client} from '../LiquityData'

export async function queryLQTYPriceV2() {
    const gql = `
        {
            pair(id:"0xb13201b48b1e61593df055576964d0b3aab66ea3")
            {
              token1Price
            }

            bundle(id: "1" ) {
                ethPrice
            }
        }
        `
        //Get Uniswap V2 price
        let data = await query(gql, uniV2Client)
        const ethPrice = data.bundle.ethPrice
        const tokenPriceInEth = data.pair.token1Price
        return ethPrice * tokenPriceInEth
}

class LQTYPriceV2 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        queryLQTYPriceV2().then(price => {
            this.setState({
              loading: false,
              price: price
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return (
            <div className="lqty-price-v2">
              <p>
                  {this.state.loading ? 'Loading...' : 'USD $' + parseFloat(this.state.price).toFixed(2)}
              </p>
            </div>
        )
    }
}

class LQTYPriceV3 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pool(id:"0xd1d5a4c0ea98971894772dcd6d2f1dc71083c44e")
            {
                token1Price
            }

           bundle(id: "1" ) {
               ethPriceUSD
           }
        }
        `

        //Get Uniswap V3 price
        query(gql, uniV3Client).then(data => {
            const ethPrice = data.bundle.ethPriceUSD
            const tokenPriceInEth = data.pool.token1Price
            this.setState({
              loading: false,
              price: ethPrice * tokenPriceInEth
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return (
            <div className="lqty-price-v3">
              <p>
                  {this.state.loading ? 'Loading...' : 'USD $' + parseFloat(this.state.price).toFixed(2)}
              </p>
            </div>
        )
    }
}

export {LQTYPriceV2}
export {LQTYPriceV3}
