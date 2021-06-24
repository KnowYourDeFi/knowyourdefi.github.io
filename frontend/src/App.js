import './App.scss';
import './bootstrap.css';
import logo from './logo.png';
import LqtyTotalSupply from './charts/LqtyTotalSupply';
import LusdTotalSupply from './charts/LusdTotalSupply';
import Holders from './charts/Holders'
import TroveSize from './charts/TroveSize'
import CollateralRatio from './charts/CollateralRatio';
import { LQTYPriceV2, LQTYPriceV3 } from './charts/LqtyPrices'
import { LUSDPriceV2, LUSDPriceV3DAI, LUSDPriceV3USDT } from './charts/LusdPrices'

function App() {
  return (
    <div className="app">

      <header className="app-header">
        {/* navigation */}
        <nav>
          <img class="app-logo" src={logo} alt={logo}></img>
        </nav>
      </header>

      <div className="app-body">
        <div>
          {/* total value locked */}
          {/* 7d TVL change */}
        </div>

        <div class="defi-title-bar">
          <span class="title">LUSD</span>
        </div>
        <LUSDPriceV2 />
        <LUSDPriceV3DAI />
        <LUSDPriceV3USDT />
        <LusdTotalSupply />

        <div class="defi-title-bar">
          <span class="title">LQTY</span>
        </div>
        <LQTYPriceV2 />
        <LQTYPriceV3 />
        <LqtyTotalSupply />

        <div class="defi-title-bar">
          <span class="title">Liquidation</span>
        </div>
        <CollateralRatio />

        <div class="defi-title-bar">
          <span class="title">Trove</span>
        </div>
        <TroveSize />

        <div class="defi-title-bar">
          <span class="title">Frontend Leaderboard</span>
        </div>
        <Holders />
      </div>
    </div>
  );
}

export default App;
