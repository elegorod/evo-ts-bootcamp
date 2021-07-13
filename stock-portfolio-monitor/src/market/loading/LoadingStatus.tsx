import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { MarketContext } from "../../App";
import styles from "./LoadingStatus.module.css"
import loading from "./loading.svg"

export const LoadingStatus = observer(() => {
  const state = useContext(MarketContext)
  return (
    <div>
      {state.loading &&
        <img className={styles.loading} src={loading} alt="Loading" />
      }
      {state.loadingError &&
        <div className={styles.loadingError}>{state.loadingError}</div>
      }
    </div>
  )
})
