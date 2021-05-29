import { ReactNode } from "react"
import styles from "./MarsTab.module.css"

interface MarsTabProps {
  selected: boolean
  onClick?: () => void
  children: ReactNode
}

export function MarsTab(props: MarsTabProps) {
  return (
    <button type="button" className={props.selected ? styles.activeTab : styles.selectableTab}
      disabled={props.selected} onClick={props.onClick}>{props.children}</button>
  )
}
