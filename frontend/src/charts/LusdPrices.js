import React from 'react'
import query from '../data/liquity'

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
        const uniV2URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
        query(gql, uniV2URL).then(data => {
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
            <div className="total-supply">
              <p>
                LUSD/ETH on Uniswap V2: {this.state.loading ? 'Loading...' : this.state.price}
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
            
           bundle(id: "1" ) {
               ethPriceUSD
           }
        }          
        `

        //Get Uniswap V3 price
        const uniV3URL = 'https://thegraph.com/explorer/subgraph/ianlapham/uniswap-v3-alt'
        query(gql, uniV3URL).then(data => {
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
            <div className="total-supply">
              <p>
                LUSD/DAI on Uniswap V3: {this.state.loading ? 'Loading...' : this.state.price}
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
            
           bundle(id: "1" ) {
               ethPriceUSD
           }
        }          
        `

        //Get Uniswap V3 price
        const uniV3URL = 'https://thegraph.com/explorer/subgraph/ianlapham/uniswap-v3-alt'
        query(gql, uniV3URL).then(data => {
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
            <div className="total-supply">
              <p>
                LUSD/USDT on Uniswap V3: {this.state.loading ? 'Loading...' : this.state.price}
              </p>
            </div>
        )
    }
}

export {LUSDPriceV2}
export {LUSDPriceV3DAI}
export {LUSDPriceV3USDT}