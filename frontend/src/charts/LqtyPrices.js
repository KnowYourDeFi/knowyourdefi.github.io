import React from 'react'
import query from '../data/liquity'

class LQTYPriceV2 extends React.Component {
    state = {
        loading: true,
        price: 0
    }

    componentDidMount() {
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
                LQTY/ETH on Uniswap V2: {this.state.loading ? 'Loading...' : this.state.price}
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
                LQTY/ETH on Uniswap V3: {this.state.loading ? 'Loading...' : this.state.price}
              </p>
            </div>
        )
    }
}

export {LQTYPriceV2}
export {LQTYPriceV3}