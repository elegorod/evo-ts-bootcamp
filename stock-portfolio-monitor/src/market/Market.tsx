import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { PriceGraph } from "./graph/PriceGraph"
import { GraphTickerChooser } from "./graph/GraphTickerChooser"
import styles from "./Market.module.css"
import { MarketPeriodButton } from "./MarketPeriodButton"
import { ViewPeriod } from "./MarketState"
import { ProfitTable } from "./ProfitTable"
import { ProfitGraph } from "./graph/ProfitGraph"
import { MarketContext } from "../App"
import { LoadingStatus } from "./loading/LoadingStatus"

export const Market = observer(() => {
  const state = useContext(MarketContext)
  useEffect(() => {
    state.load()
  }, [state])

  return (
    <div>
      <div className={styles.periodContainer}>
        <MarketPeriodButton period={ViewPeriod.Week}>1 week</MarketPeriodButton>
        <MarketPeriodButton period={ViewPeriod.Month}>1 month</MarketPeriodButton>
        <MarketPeriodButton period={ViewPeriod.Year}>1 year</MarketPeriodButton>
      </div>
      <h3>Profit</h3>
      <LoadingStatus />
      <ProfitTable />
      <GraphTickerChooser />
      <div className={styles.graphContainer}>
        <PriceGraph />
        <ProfitGraph />
      </div>
    </div>
  )
})
