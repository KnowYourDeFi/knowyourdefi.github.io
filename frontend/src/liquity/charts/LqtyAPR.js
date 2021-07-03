import React from 'react'
import {nowTimestamp} from '../utility/Timestamps'
import {query, uniV2Client, getBlocksFromTimestamps} from '../LiquityData'

class LqtyAPR extends React.Component {
    state = {
        hasLiquityInfo: false,
        hasPriceInfo: false,
        data: {}
    }

    //Get blocks for now and 7 days ago
    async getBlocks() {
        let now = nowTimestamp() - 600
        let weekAgo = now - 7 * 24 * 3600
        let blocks = await getBlocksFromTimestamps([weekAgo, now])
        return blocks
    }

    getLiquityInfo(blocks) {
        //Query for Liquity info
        let gql = 'query blocks {'
        gql += blocks.map(
          (block) => `
            t${block.timestamp}: global(id:"only", block: { number: ${block.number} }) { 
                totalRedemptionFeesPaid
                totalBorrowingFeesPaid
                totalLQTYTokensStaked
            }
          `
        )
        gql += '}'

        query(gql).then(data => {
            // format result
            let values = []
            for (var row in data) {
              let timestamp = row.split('t')[1]
              let totalRedemptionFeesPaid = parseFloat(data[row]?.totalRedemptionFeesPaid)
              let totalBorrowingFeesPaid = parseFloat(data[row]?.totalBorrowingFeesPaid)
              let totalLQTYTokensStaked = parseFloat(data[row]?.totalLQTYTokensStaked)
              if (timestamp) {
                values.push({
                  timestamp,
                  totalRedemptionFeesPaid,
                  totalBorrowingFeesPaid,
                  totalLQTYTokensStaked
                })
              }
            }
            //Sort values
            values.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)

            this.setState({
              hasLiquityInfo: true,
              data: {
                ...this.state.data,
                liquityInfo: values
            }
            })
        }).catch(e => {
            console.error(e)
        })
    }

    getPriceInfo() {
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
        query(gql, uniV2Client).then(data => {
            const ethPrice = parseFloat(data.bundle.ethPrice)
            const tokenPriceInEth = data.pair.token1Price
            this.setState({
                hasPriceInfo: true,
                data: {
                    ...this.state.data,
                    ethPrice: ethPrice,
                    lqtyPrice: ethPrice * tokenPriceInEth
                }
            })
        }).catch(e => {
            console.error(e)
        })
    }

    componentDidMount() {
        this.getPriceInfo()
        this.getBlocks().then(data => {
            this.getLiquityInfo(data)
        }).catch(e => {
            console.error(e)
        })
    }

    render() {
        let loaded = this.state.hasLiquityInfo && this.state.hasPriceInfo
        let apr = 'Error'
        if (loaded) {
            const liquityInfo = this.state.data.liquityInfo
            if (liquityInfo.length === 2) {
                const borrowFeeDiff = liquityInfo[1].totalBorrowingFeesPaid - liquityInfo[0].totalBorrowingFeesPaid
                const redemptionFeeDiff = liquityInfo[1].totalRedemptionFeesPaid - liquityInfo[0].totalRedemptionFeesPaid
                const numeral = (borrowFeeDiff + redemptionFeeDiff * this.state.data.ethPrice) / (liquityInfo[1].totalLQTYTokensStaked * this.state.data.lqtyPrice) / 7 * 365
                apr = parseFloat(numeral * 100).toFixed(2)+"%"
            }
        }
        return (
            <div className="lqty-apr">
              <p>
                  {loaded ? apr: 'Loading...'}
              </p>
            </div>
        )
    }
}

export {LqtyAPR}