import { createContext } from 'react';
import Modal from "react-modal"
import './App.css';
import { Market } from './market/Market';
import MarketState from './market/MarketState';
import { Portfolio } from './portfolio/Portfolio';
import PortfolioState from './portfolio/PortfolioState';

const portfolioState = new PortfolioState()
export const PortfolioContext = createContext(portfolioState)

const marketState = new MarketState(portfolioState)
export const MarketContext = createContext(marketState)

function App() {
  return (
    <div className="App">
      <PortfolioContext.Provider value={portfolioState}>
        <MarketContext.Provider value={marketState}>
          <div className="portfolioContainer">
            <h2>Portfolio</h2>
            <Portfolio />
          </div>
          <div className="marketContainer">
            <h2>Market data</h2>
            <Market />
          </div>
        </MarketContext.Provider>
      </PortfolioContext.Provider>
    </div>
  );
}

export default App;

Modal.setAppElement("#root")
