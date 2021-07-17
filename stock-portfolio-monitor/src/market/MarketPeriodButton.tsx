import { ReactNode, useCallback, useContext } from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames/bind"
import styles from "./MarketPeriodButton.module.css"
import { ViewPeriod } from "./MarketState";
import { MarketContext } from "../App";

interface MarketPeriodButtonProps {
  period: ViewPeriod
  children: ReactNode
}

const moduleClassNames = classNames.bind(styles)

export const MarketPeriodButton = observer((props: MarketPeriodButtonProps) => {
  const state = useContext(MarketContext)
  const selected = state.period === props.period
  const onClick = useCallback(() =>
    state.setPeriod(props.period),
    [props.period, state])

  const classes = moduleClassNames({
    button: true,
    active: selected,
    selectable: !selected
  })
  return (
    <button type="button" className={classes} disabled={selected} onClick={onClick}>
      {props.children}
    </button>
  )
})
