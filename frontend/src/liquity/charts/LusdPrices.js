import React from 'react'
import {query, uniV2Client, uniV3Client} from '../LiquityData'

class LUSDPriceV2 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pair(id:"0xf20ef17b889b437c151eb5ba15a47bfc62bff469")
            {
              token1Price
            }

            bundle(id: "1" ) {
                ethPrice
            }
        }
        `
        //Get Uniswap V2 price
        query(gql, uniV2Client).then(data => {
            const ethPrice = data.bundle.ethPrice
            const tokenPriceInEth = data.pair.token1Price
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
            <div className="lusd-price-v2">
              <p>
                  {this.state.loading ? 'Loading...' : 'US $' + parseFloat(this.state.price).toFixed(2)}
              </p>
            </div>
        )
    }
}

class LUSDPriceV3DAI extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pool(id:"0x16980c16811bde2b3358c1ce4341541a4c772ec9")
            {
                token1Price
            }
        }
        `

        //Get Uniswap V3 price
        query(gql, uniV3Client).then(data => {
            this.setState({
              loading: false,
              price: data.pool.token1Price
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return (
            <div className="lusd-price-v3-dai">
              <p>
                  {this.state.loading ? 'Loading...' : 'US $' + parseFloat(this.state.price).toFixed(2)}
              </p>
            </div>
        )
    }
}

class LUSDPriceV3USDT extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
        const gql = `
        {
            pool(id:"0x67e887913b13e280538c169f13d169a659a203de")
            {
                token1Price
            }
        }
        `

        //Get Uniswap V3 price
        query(gql, uniV3Client).then(data => {
            this.setState({
              loading: false,
              price: data.pool.token1Price
            })
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        return (
            <div className="lusd-price-v3-usdt">
              <p>
                  {this.state.loading ? 'Loading...' : 'US $' + parseFloat(this.state.price).toFixed(2)}
              </p>
            </div>
        )
    }
}

export {LUSDPriceV2}
export {LUSDPriceV3DAI}
export {LUSDPriceV3USDT}
