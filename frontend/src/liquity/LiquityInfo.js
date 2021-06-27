import React from 'react'
import LqtyTotalSupply from './charts/LqtyTotalSupply';
import LusdTotalSupply from './charts/LusdTotalSupply';
import Holders from './charts/Holders'
import TroveSize from './charts/TroveSize'
import CollateralRatio from './charts/CollateralRatio';
import { LQTYPriceV2, LQTYPriceV3 } from './charts/LqtyPrices'
import { LUSDPriceV2, LUSDPriceV3DAI, LUSDPriceV3USDT } from './charts/LusdPrices'
import { CurrentTroveNumber, RecentTroveNumbers } from './charts/TroveNumbers'
import { StakingLUSD } from './charts/StakingLUSD'
import {CurrentTVL} from'./charts/TVL'
import {LqtyAPR} from'./charts/LqtyAPR'

class LiquityInfo extends React.Component {

  render() {
    return (
      <div className="defi-info">
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title">Total Value Locked</div>
            <CurrentTVL />
          </div>
          <div className="defi-card">
            <div className="defi-card-title">Hourly TVL Change (7d)</div>
            Chart
          </div>
        </div>

        <div className="defi-title-bar">
          <span className="title">LUSD</span>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">LUSD/DAI on Uniswap V3</div>
            <div className="defi-card-large-text">US $1.01</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD/USDT on Uniswap V3</div>
            <div className="defi-card-large-text">US $1.01</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD/ETH on Uniswap V3</div>
            <div className="defi-card-large-text">US $1.01</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Holders</div>
            <div className="defi-card-large-text">2,346</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Staking APR(7d average)</div>
            <div className="defi-card-large-text">13.41%</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Total Supply</div>
            <div className="defi-card-large-text">X,XXX,XXX</div>
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">LUSD Total Supply</div>
          Chart
        </div>
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title">Staking LUSD (7d)</div>

            <StakingLUSD />
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Mint/Burn (7d)</div>
            Chart
          </div>
        </div>

        <LUSDPriceV2 />
        <LUSDPriceV3DAI />
        <LUSDPriceV3USDT />
        <LusdTotalSupply />

        <div className="defi-title-bar">
          <span className="title">LQTY</span>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">LQTY/ETH on Uniswap V3</div>
            <div className="defi-card-large-text">US $1.01</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LQTY/ETH on Uniswap V2</div>
            <div className="defi-card-large-text">US $1.01</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LQTY Circulating Supply</div>
            <div className="defi-card-large-text">5,954,252</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LQTY Holders</div>
            <div className="defi-card-large-text">2,346</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LQTY Staking APR(7d average)</div>
            <div className="defi-card-large-text">
            <LqtyAPR />
            </div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LQTY Total Supply</div>
            <div className="defi-card-large-text">X,XXX,XXX</div>
          </div>
        </div>

        <LQTYPriceV2 />
        <LQTYPriceV3 />
        <LqtyTotalSupply />

        <div className="defi-title-bar">
          <span className="title">Liquidation</span>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Total Collateral Ratio</div>
          <CollateralRatio />
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Recent Liquidations</div>
          Chart
        </div>

        <div className="defi-title-bar">
          <span className="title">Trove</span>
        </div>
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title">Number of Troves (7d)</div>
            Chart
          </div>
          <div className="defi-card">
            <div className="defi-card-title">Trove Size (7d)</div>
            <RecentTroveNumbers />
          </div>
        </div>

        <TroveSize />
        <CurrentTroveNumber />

        <div className="defi-title-bar">
          <span className="title">Frontend Leaderboard</span>
        </div>
        Chart
        {/* <Holders /> */}
      </div>
    )
  }
}

export default LiquityInfo
