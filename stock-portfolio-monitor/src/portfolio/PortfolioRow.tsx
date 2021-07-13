import { observer } from "mobx-react-lite";
import { PortfolioItem } from "./PortfolioState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./PortfolioRow.module.css"
import { useCallback, useContext } from "react";
import { MarketContext, PortfolioContext } from "../App";

interface PortfolioRowProps {
  item: PortfolioItem
}

export const PortfolioRow = observer((props: PortfolioRowProps) => {
  const item = props.item
  const state = useContext(PortfolioContext)
  const marketState = useContext(MarketContext)
  const currentPrice = marketState.currentPrices.find(_ => _.ticker === item.ticker)?.price
  const onEdit = useCallback(() =>
    state.edit(item.id),
    [state, item.id])

  return (
    <tr>
      <td>{item.ticker}</td>
      <td className={styles.alignRight}>{item.count}</td>
      <td className={styles.alignRight}>{item.date.toString()}</td>
      <td className={styles.alignRight}>{item.price.toFixed(2)}</td>
      <td className={styles.alignRight}>{currentPrice?.toFixed(2)}</td>
      <td>
        <button type="button" className={styles.actionButton} onClick={onEdit}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </td>
    </tr>
  )
})
