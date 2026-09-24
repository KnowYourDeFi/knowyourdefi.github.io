/*
 * 文件说明: 保留原版数据卡片布局，将单个组件异常隔离在卡片内。
 */
import DataBoundary from '../widget/DataBoundary'
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
            <div className="defi-card-large-text"><DataBoundary><HOPRPriceV3 /></DataBoundary></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR/DAI on Uniswap V2</div>
            <div className="defi-card-large-text"><DataBoundary><HOPRPriceV2 /></DataBoundary></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR Total Supply</div>
            <div className="defi-card-large-text"><DataBoundary><HoprTotalSupply /></DataBoundary></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR Holders Mainnet</div>
            <div className="defi-card-large-text"><DataBoundary><HoprHolders /></DataBoundary></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">HOPR Holders xDai</div>
            <div className="defi-card-large-text"><DataBoundary><HoprXdaiHolders /></DataBoundary></div>
          </div>
        </div>
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title"> HOPR Price on Uniswap V2</div>
            <DataBoundary><HoprPriceHistory /></DataBoundary>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">Holder Balance (Mainnet & xDai)</div>
            <DataBoundary><HolderBalance /></DataBoundary>
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Recent Mainnet Transactions</div>
          <DataBoundary><Transactions /></DataBoundary>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Recent xDai Transactions</div>
          <DataBoundary><XdaiTransactions /></DataBoundary>
        </div>
      </div>

    )
  }
}

export default HoprInfo