import React from 'react'
import { ReactComponent as KeepHeader} from '../resources/keep.svg'
import { ReactComponent as NuHeader} from '../resources/nucypher.svg'
import { ReactComponent as TBTCLogo} from '../resources/TBTC.svg'
import { TBTCPriceV2 } from './charts/KeanuPrices'

class HoprInfo extends React.Component {

  render() {
    return (
      <div className="defi-info">
        <div style={{ textAlign: 'center' }}>
          <KeepHeader  style={{ maxWidth: 180 }} />
          <NuHeader  style={{ maxWidth: 180 }} />
        </div>

        <div className="defi-title">
          <TBTCLogo className="defi-title-logo" />
          <span className="defi-title-text">TBTC</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              <p>tBTC is a fully Bitcoin-backed ERC-20 token pegged to the price of Bitcoin. It facilitates Bitcoin holders to act on the Ethereum blockchain and access the decentralized finance (DeFi) ecosystem.</p>
            </div>
          </div>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">TBTC/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><TBTCPriceV2 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">TBTC/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><TBTCPriceV2 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">TBTC/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><TBTCPriceV2 /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default HoprInfo 