import React from 'react'
import LqtyTotalSupply from './charts/LqtyTotalSupply';
import { LusdCurrentTotalSupply, LusdTotalSupply, Lusd7DayMintBurn } from './charts/LusdTotalSupply';
import TroveSize from './charts/TroveSize'
import CollateralRatio from './charts/CollateralRatio';
import { LQTYPriceV2, LQTYPriceV3 } from './charts/LqtyPrices'
import { LUSDPriceV2, LUSDPriceV3DAI, LUSDPriceV3USDT } from './charts/LusdPrices'
import LusdHolders from './charts/LusdHolders'
import LusdAPR  from './charts/LusdAPR'
import { RecentTroveNumbers } from './charts/TroveNumbers'
import { StakingLUSD } from './charts/StakingLUSD'
import {TVL, TVL7DayChange} from'./charts/TVL'
import {LqtyAPR} from'./charts/LqtyAPR'
import LqtyHolders from './charts/LqtyHolders'
import Liquidations from './charts/Liquidations'
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
              <p>LUSD is a USD pegged stablecoin. You can draw interest-free loans against Ether used as collateral. Loans are paid out in LUSD. By depositing LUSD into the Stability Pool, you can earn ETH and LQTY rewards.</p>
              <p>When the price of LUSD is less than 1, you can arbitrage by trading ETH for LUSD.</p>
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
            <div className="defi-card-title">LUSD/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><LUSDPriceV2 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Holders</div>
            <div className="defi-card-large-text"><LusdHolders /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Staking APR(7d average)</div>
            <div className="defi-card-large-text"><LusdAPR /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Total Supply</div>
            <div className="defi-card-large-text"><LusdCurrentTotalSupply /></div>
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">LUSD Total Supply</div>
          <LusdTotalSupply />
        </div>
        <div className="defi-card-group-2">
          <div className="defi-card">
            <div className="defi-card-title">Staking LUSD (7d)</div>
            <StakingLUSD />
          </div>
          <div className="defi-card">
            <div className="defi-card-title">LUSD Mint/Burn (7d)</div>
            <Lusd7DayMintBurn />
          </div>
        </div>


        <div className="defi-title">
          <LQTYLogo className="defi-title-logo" />
          <span className="defi-title-text">LQTY</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              <p>LQTY is the secondary token issued by the Liquity protocol.</p>
              <p>By staking your LQTY tokens, you can earn a share of borrowing / redemption fees charged by the protocol.</p>
              <p>Attention! These fees are not stable. The APR is directly related to the user's behavior, only useful for reference.</p>
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
            <div className="defi-card-large-text"><LqtyHolders /></div>
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
              <p>Recovery Mode is triggered if total collatoral ratio falls below the Critical Collateral Ratio, set to 150%. When this happens, the riskiest Troves are liquidated (even if they are over 110% collateralized) until the Critical Collateral Ratio threshold is met. If the following values are close to 150%, you need to pay attention to whether your Trove is safe.</p>
            </div>
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Total Collateral Ratio</div>
          <CollateralRatio />
        </div>
        <div className="defi-card">
          <div className="defi-card-title">Recent Liquidations</div>
          <Liquidations />
        </div>

        <div className="defi-title">
          <TroveLogo className="defi-title-logo" />
          <span className="defi-title-text">Trove</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              <p>A Trove is where you take out and maintain your loan. Each Trove is linked to an Ethereum address and each address can have just one Trove. If you are familiar with Vaults or CDPs from other platforms, Troves are similar in concept.</p>
              <p>Troves maintain two balances: one is an asset (ETH) acting as collateral and the other is a debt denominated in LUSD. You can change the amount of each by adding collateral or repaying debt. As you make these balance changes, your Trove’s collateral ratio changes accordingly.</p>
              <p>You can click the connect button and check the risk alert on your profile page to control your trove according to your risk tolerance. You can close your trove at any time by fully paying off your debt.</p>
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
              <p>To open loans, make deposits etc., you have to use one of the frontends provided by third parties. By connecting users to Liquity, frontends can earn LQTY rewards distributed by the protocol.</p>
              <p>The Kickback rate means the rewards you can eventually earn. For example, if it is 99%, the frontend operator will earn 1% of the reward, and  you will earn the remaining 99%.</p>
              <p>The revenue generated by a frontend grows proportionally with the total amount of LUSD deposited by its users to the Stability Pool.</p>
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
