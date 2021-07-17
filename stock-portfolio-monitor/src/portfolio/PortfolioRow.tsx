import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext } from "react";
import { PortfolioItem } from "./PortfolioState";
import styles from "./PortfolioRow.module.css"
import { MarketContext, PortfolioContext } from "../App";

interface PortfolioRowProps {
  item: PortfolioItem
}

export const PortfolioRow = observer((props: PortfolioRowProps) => {
  const { id, count, date, ticker, price } = props.item
  const state = useContext(PortfolioContext)
  const marketState = useContext(MarketContext)
  const currentPrice = marketState.currentPrices.find(cp => cp.ticker === ticker)?.price
  const onEdit = useCallback(() =>
    state.edit(id),
    [state, id])

  return (
    <tr>
      <td>{ticker}</td>
      <td className={styles.alignRight}>{count}</td>
      <td className={styles.alignRight}>{date.toString()}</td>
      <td className={styles.alignRight}>{price.toFixed(2)}</td>
      <td className={styles.alignRight}>{currentPrice?.toFixed(2)}</td>
      <td>
        <button type="button" className={styles.actionButton} onClick={onEdit}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </td>
    </tr>
  )
})
