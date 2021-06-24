import './App.css';
import './bootstrap.css';
import TotalSupply from './charts/TotalSupply';
import Holders from './charts/Holders'
import TroveSize from './charts/TroveSize'
import CollateralRatio from './charts/CollateralRatio';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CollateralRatio />
        <TotalSupply />
        <TroveSize />
        <Holders />
      </header>
    </div>
  );
}

export default App;
