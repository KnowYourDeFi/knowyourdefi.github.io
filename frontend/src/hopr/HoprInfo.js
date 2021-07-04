import React from 'react'
import { ReactComponent as HoprHeader} from '../resources/hopr_logo.svg'
import { HOPRPriceV2, HOPRPriceV3 } from './charts/HoprPrices'
import { HoprHolders, HoprXdaiHolders } from './charts/Holders'
import HoprTotalSupply from './charts/HoprTotalSupply'
import { HoprPriceHistory } from './charts/HoprPriceHistory'
import HolderBalance from './charts/HolderBalance'
import {Transactions, XdaiTransactions} from './charts/Transactions'

class HoprInfo extends React.Component {

  render() {
    return (
      <div className="defi-info">
        <div style={{ textAlign: 'center' }}>
          <HoprHeader  style={{ maxWidth: 180 }} />
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">HOPR/DAI on Uniswap V3</div>
            <div className="defi-card-large-text"><HOPRPriceV3 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR/DAI on Uniswap V2</div>
            <div className="defi-card-large-text"><HOPRPriceV2 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR Total Supply</div>
            <div className="defi-card-large-text"><HoprTotalSupply /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR Holders Mainnet</div>
            <div className="defi-card-large-text"><HoprHolders /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR Holders xDai</div>
            <div className="defi-card-large-text"><HoprXdaiHolders /></div>
          </div>
        </div>
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title"> HOPR Price on Uniswap V2</div>
            <HoprPriceHistory />
          </div>
          <div className="defi-card">
            <div className="defi-card-title">Holder Balance (Mainnet & xDai)</div>
            <HolderBalance />
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Recent Mainnet Transactions</div>
          <Transactions />
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Recent xDai Transactions</div>
          <XdaiTransactions />
        </div>
      </div>

    )
  }
}

export default HoprInfo