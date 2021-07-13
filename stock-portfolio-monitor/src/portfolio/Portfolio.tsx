import { useCallback, useContext } from "react"
import { observer } from "mobx-react-lite";
import { PortfolioContext } from "../App";
import styles from "./Portfolio.module.css"
import { PortfolioRow } from "./PortfolioRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { PortfolioDialog } from "./PortfolioDialog";

export const Portfolio = observer(() => {
  const state = useContext(PortfolioContext)
  const onAdd = useCallback(() =>
    state.add(),
    [state])

  return (
    <div>
      <table className={styles.portfolioTable}>
        <thead>
          <tr className={styles.headerRow}>
            <th>Ticker</th>
            <th>Count</th>
            <th>Buy date</th>
            <th>Buy price</th>
            <th>Current price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.items.map(item =>
            <PortfolioRow item={item} key={item.id} />
          )}
        </tbody>
      </table>
      <div>
        <button type="button" className={styles.addButton} onClick={onAdd}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add item
        </button>
      </div>
      <PortfolioDialog/>
    </div>
  )
})
