import React from 'react'
import LqtyTotalSupply from './charts/LqtyTotalSupply';
import LusdTotalSupply from './charts/LusdTotalSupply';
import Holders from './charts/Holders'
import TroveSize from './charts/TroveSize'
import CollateralRatio from './charts/CollateralRatio';
import { LQTYPriceV2, LQTYPriceV3 } from './charts/LqtyPrices'
import { LUSDPriceV2, LUSDPriceV3DAI, LUSDPriceV3USDT } from './charts/LusdPrices'

class LiquityInfo extends React.Component {

  render() {
    return (
      <div>
        <div>
          {/* total value locked */}
          {/* 7d TVL change */}
        </div>

        <div className="defi-title-bar">
          <span className="title">LUSD</span>
        </div>
        <LUSDPriceV2 />
        <LUSDPriceV3DAI />
        <LUSDPriceV3USDT />
        <LusdTotalSupply />

        <div className="defi-title-bar">
          <span className="title">LQTY</span>
        </div>
        <LQTYPriceV2 />
        <LQTYPriceV3 />
        <LqtyTotalSupply />

        <div className="defi-title-bar">
          <span className="title">Liquidation</span>
        </div>
        <CollateralRatio />

        <div className="defi-title-bar">
          <span className="title">Trove</span>
        </div>
        <TroveSize />

        <div className="defi-title-bar">
          <span className="title">Frontend Leaderboard</span>
        </div>
        <Holders />
      </div>
    )
  }
}

export default LiquityInfo
