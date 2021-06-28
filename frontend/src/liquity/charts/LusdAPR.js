import React from 'react'
import {query} from '../LiquityData'
import {nowTimestamp} from '../../utils/Timestamps'
import {queryLQTYPriceV2} from './LqtyPrices'
import dayjs from 'dayjs'

class LusdAPR extends React.Component {
    state = {
        depositedLUSD: null,
        lqtyPrice: null
    }

    componentDidMount() {
        const gql = `
        {
            systemStates(first:1, orderBy: sequenceNumber, orderDirection:desc)
              {
                tokensInStabilityPool
              }
        }
        `
        //Get Uniswap V2 price
        query(gql).then(data => {
            let arr = data.systemStates
            if (!arr || arr.length === 0) return
            let depositedLUSD = parseFloat(arr[0].tokensInStabilityPool)
            this.setState({
                ...this.state,
                depositedLUSD: depositedLUSD
            })
        }).catch(e => {
            console.error(e)
        })

        queryLQTYPriceV2().then(price => {
            this.setState({
                ...this.state,
              lqtyPrice: price
            })
        }).catch(e => {
            console.error(e)
        })
    }

    calculateAPR(depositedLUSD, lqtyPrice) {
        const issuanceFactor = 0.999998681227695000
        const deploymenttime = 1617611537
        const lqtysupplycap = 32000000
        
        const minutesPassed = (nowTimestamp() - deploymenttime) / 60
        const factor = Math.pow(issuanceFactor, minutesPassed)
        const lqtyRewards = lqtysupplycap * factor

        const years = dayjs().year() - 2020
        const yearlyDistribution = 1 - Math.pow(0.5, years)
        const apr = (lqtyRewards * lqtyPrice * yearlyDistribution) / depositedLUSD
        return parseFloat(apr * 100).toFixed(2)+"%"
    }

    render() {
        console.log('rendering', this.state)
        const loaded = this.state.depositedLUSD && this.state.lqtyPrice
        console.log('loaded', loaded)
        return (
            <div className="lqty-price-v2">
              <p>
                  {loaded ? this.calculateAPR(this.state.depositedLUSD, this.state.lqtyPrice) : 'Loading...'}
              </p>
            </div>
        )
    }
}

export default LusdAPR