import React from 'react'
import LqtyTotalSupply from './charts/LqtyTotalSupply';
import LusdTotalSupply from './charts/LusdTotalSupply';
import TroveSize from './charts/TroveSize'
import CollateralRatio from './charts/CollateralRatio';
import { LQTYPriceV2, LQTYPriceV3 } from './charts/LqtyPrices'
import { LUSDPriceV2, LUSDPriceV3DAI, LUSDPriceV3USDT } from './charts/LusdPrices'
import { RecentTroveNumbers } from './charts/TroveNumbers'
import { StakingLUSD } from './charts/StakingLUSD'
import {TVL, TVL7DayChange} from'./charts/TVL'
import {LqtyAPR} from'./charts/LqtyAPR'
import LiquityHeader from './LiquityHeader';
import { ReactComponent as LUSDLogo } from '../resources/lusd.svg'
import { ReactComponent as LQTYLogo } from '../resources/liquity.svg'
import { ReactComponent as LiquidationLogo } from '../resources/liquidation.svg'
import { ReactComponent as TroveLogo } from '../resources/trove.svg'
import { ReactComponent as LeaderboardLogo } from '../resources/leaderboard.svg'

class LiquityInfo extends React.Component {

  render() {
    return (
      <div className="defi-info">
        <LiquityHeader />
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title">Total Value Locked</div>
            <TVL />
          </div>
          <div className="defi-card">
            <div className="defi-card-title">Hourly TVL Change (7d)</div>
            <TVL7DayChange />
          </div>
        </div>

        <div className="defi-title">
          <LUSDLogo className="defi-title-logo" />
          <span className="defi-title-text">LUSD</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              InfoInfoInfoInfoInfoInfoInfoInfoInfo<br />
              InfoInfoInfoInfoInfoInfoInfoInfoInfo
            </div>
          </div>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">LUSD/DAI on Uniswap V3</div>
            <div className="defi-card-large-text"><LUSDPriceV3DAI /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD/USDT on Uniswap V3</div>
            <div className="defi-card-large-text"><LUSDPriceV3USDT /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD/ETH on Uniswap V3</div>
            <div className="defi-card-large-text"><LUSDPriceV2 /></div>
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
            <div className="defi-card-large-text"><LusdTotalSupply /></div>
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


        <div className="defi-title">
          <LQTYLogo className="defi-title-logo" />
          <span className="defi-title-text">LQTY</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              InfoInfoInfoInfoInfoInfoInfoInfoInfo<br />
              InfoInfoInfoInfoInfoInfoInfoInfoInfo
            </div>
          </div>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">LQTY/ETH on Uniswap V3</div>
            <div className="defi-card-large-text"><LQTYPriceV3 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LQTY/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><LQTYPriceV2 /></div>
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
            <div className="defi-card-large-text"><LqtyTotalSupply /></div>
          </div>
        </div>


        <div className="defi-title">
          <LiquidationLogo className="defi-title-logo" />
          <span className="defi-title-text">Liquidation</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              InfoInfoInfoInfoInfoInfoInfoInfoInfo<br />
              InfoInfoInfoInfoInfoInfoInfoInfoInfo
            </div>
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Total Collateral Ratio</div>
          <CollateralRatio />
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Recent Liquidations</div>
          Chart
        </div>

        <div className="defi-title">
          <TroveLogo className="defi-title-logo" />
          <span className="defi-title-text">Trove</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              InfoInfoInfoInfoInfoInfoInfoInfoInfo<br />
              InfoInfoInfoInfoInfoInfoInfoInfoInfo
            </div>
          </div>
        </div>
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title">Number of Troves (7d)</div>
            <RecentTroveNumbers />
          </div>
          <div className="defi-card">
            <div className="defi-card-title">Trove Size</div>
            <TroveSize />
          </div>
        </div>

        <div className="defi-title">
          <LeaderboardLogo className="defi-title-logo" />
          <span className="defi-title-text">Frontend Leaderboard</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              InfoInfoInfoInfoInfoInfoInfoInfoInfo<br />
              InfoInfoInfoInfoInfoInfoInfoInfoInfo
            </div>
          </div>
        </div>
        Chart
        {/* <Holders /> */}
      </div>
    )
  }
}

export default LiquityInfo
