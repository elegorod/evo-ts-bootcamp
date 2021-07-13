import { observer } from "mobx-react-lite";
import { useCallback, useContext } from "react";
import classNames from "classnames/bind"
import { MarketContext } from "../../App";
import styles from "./GraphTickerButton.module.css"

interface GraphTickerButtonProps {
  ticker: string
}

const moduleClassNames = classNames.bind(styles)

export const GraphTickerButton = observer((props: GraphTickerButtonProps) => {
  const state = useContext(MarketContext)
  const selected = state.graphTicker === props.ticker
  const onClick = useCallback(() =>
    state.setGraphTicker(props.ticker),
    [props.ticker, state])

  const classes = moduleClassNames({
    button: true,
    active: selected,
    selectable: !selected
  })
  return (
    <button type="button" className={classes} disabled={selected} onClick={onClick}>
      {props.ticker}
    </button>
  )
})
