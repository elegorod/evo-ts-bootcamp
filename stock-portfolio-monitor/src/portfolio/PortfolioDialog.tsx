import { faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { runInAction } from "mobx"
import { observer } from "mobx-react-lite"
import { useCallback, useContext } from "react"
import Modal from "react-modal"
import { MarketContext, PortfolioContext } from "../App"
import styles from "./PortfolioDialog.module.css"
import { TickerField } from "./TickerField"

export const PortfolioDialog = observer(() => {
  const state = useContext(PortfolioContext)
  const marketState = useContext(MarketContext)
  const item = state.editedItem

  const onClose = useCallback(() =>
    state.stopEdit(),
    [state])

  const onSave = useCallback(event => {
    if (event.target.form?.checkValidity()) {
      state.save()
      marketState.refresh()
    }
    event.preventDefault()
  }, [state, marketState])

  const onDelete = useCallback(() => {
    state.delete()
    marketState.refresh()
  }, [state, marketState])

  const onTickerChange = useCallback(ticker => {
    if (item) {
      runInAction(() =>
        item.ticker = ticker)
    }
  }, [item])

  const onCountChange = useCallback(event => {
    if (item) {
      runInAction(() =>
        item.count = event.target.value)
    }
  }, [item])

  const onDateChange = useCallback(event => {
    if (item) {
      runInAction(() =>
        item.date = event.target.value)
    }
  }, [item])

  const onPriceChange = useCallback(event => {
    if (item) {
      runInAction(() =>
        item.price = event.target.value)
    }
  }, [item])

  return (
    <Modal isOpen={item !== undefined} onRequestClose={onClose} className={styles.modal}
      overlayClassName={styles.overlay}>
      {item &&
        <div>
          <h3>
            {state.createMode ? "Add " : "Edit "}
            portfolio item
          </h3>
          <form onSubmit={onSave}>
            <div className={styles.fields}>
              <label htmlFor="ticker">Ticker</label>
              <TickerField value={item.ticker} onChange={onTickerChange} />
              <label htmlFor="count">Count</label>
              <input type="number" id="count" className={styles.count}
                required min="1" step="1" value={item.count} onChange={onCountChange} />
              <label htmlFor="buyDate">Buy date</label>
              <input type="date" id="buyDate" className={styles.date} required value={item.date}
                onChange={onDateChange} />
              <label htmlFor="buyPrice">Buy price</label>
              <input type="number" id="buyPrice" className={styles.price}
                required min="0.01" step="0.01" value={item.price} onChange={onPriceChange} />
            </div>

            <div className={styles.buttons}>
              <button type="submit" onClick={onSave}>
                <FontAwesomeIcon icon={faSave} />
                Save
              </button>
              {!state.createMode &&
                <button type="button" onClick={onDelete}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Delete
                </button>
              }
              <span className={styles.spacer}></span>
              <button type="button" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      }
    </Modal>
  )
})
