import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { PortfolioContext } from "../../App";
import { GraphTickerButton } from "./GraphTickerButton";

export const GraphTickerChooser = observer(() => {
  const portfolioState = useContext(PortfolioContext)

  return (
    <div>
      {portfolioState.uniqueTickers.map(ticker =>
        <GraphTickerButton ticker={ticker} key={ticker}/>
      )}
    </div>
  )
})

