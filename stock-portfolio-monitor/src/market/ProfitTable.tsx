import { sumBy } from "lodash";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { MarketContext } from "../App";
import styles from "./ProfitTable.module.css"

export const ProfitTable = observer(() => {
  const state = useContext(MarketContext)
  const { selectedStockProfits } = state
  const totalValue = sumBy(selectedStockProfits, profit => profit.value)
  const previousInvestedValue = sumBy(selectedStockProfits, profit => profit.previousInvestedValue)
  let totalPercent = 0
  if (previousInvestedValue > 0) {
    totalPercent = totalValue / previousInvestedValue * 100
  }

  return (
    <table className={styles.profitTable}>
      <tbody>
        <tr className={styles.totalRow}>
          <td className={styles.nameCell}>Total</td>
          <td className={styles.moneyValueCell}>{totalValue.toFixed(2)}</td>
          <td className={styles.currencyCell}>$</td>
          <td className={styles.percentValueCell}>{totalPercent.toFixed(2)}</td>
          <td className={styles.percentSignCell}>%</td>
        </tr>
        {selectedStockProfits.map(profit =>
          <tr key={profit.ticker}>
            <td className={styles.nameCell}>{profit.ticker}</td>
            <td className={styles.moneyValueCell}>{profit.value.toFixed(2)}</td>
            <td className={styles.currencyCell}>$</td>
            <td className={styles.percentValueCell}>{profit.percent.toFixed(2)}</td>
            <td className={styles.percentSignCell}>%</td>
          </tr>
        )}
      </tbody>
    </table>
  )
})
