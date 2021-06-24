import './App.css';
import './bootstrap.css';
import TotalSupply from './charts/TotalSupply';
import Holders from './charts/Holders'
import TroveSize from './charts/TroveSize'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TotalSupply />
        <TroveSize />
        <Holders />
      </header>
    </div>
  );
}

export default App;
