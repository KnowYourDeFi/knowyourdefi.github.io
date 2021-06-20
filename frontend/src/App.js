import './App.css';
import './bootstrap.css';
import TotalSupply from './charts/TotalSupply';
import Holders from './charts/Holders'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TotalSupply />
        <Holders />
      </header>
    </div>
  );
}

export default App;
