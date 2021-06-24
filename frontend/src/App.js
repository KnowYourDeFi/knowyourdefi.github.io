import './App.css';
import './bootstrap.css';
import TotalSupply from './charts/TotalSupply';
import Holders from './charts/Holders'
import TroveSize from './charts/TroveSize'
import CollateralRatio from './charts/CollateralRatio';
import {LQTYPriceV2} from './charts/LqtyPrices'
import {LQTYPriceV3} from './charts/LqtyPrices'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TotalSupply />
        <LQTYPriceV2 />
        <LQTYPriceV3 />
        <TroveSize />
        <Holders />
      </header>
    </div>
  );
}

export default App;
