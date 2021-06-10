import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useState } from 'react';

import styles from './MarsPhotos.module.css';
import { MarsFigureContainer } from './MarsFigureContainer';
import { MarsContext } from './Mars';

export const MarsPhotos = observer(() => {
  const state = useContext(MarsContext)
  const sol = state.sol
  const solData = state.currentSolData

  const [solString, setSolString] = useState(sol.toString())

  const numberChanged = useCallback(event => {
    const solValue = event.target.value
    setSolString(solValue)
    const sol = parseInt(solValue)
    if (isFinite(sol)) {
      state.setSol(sol)
    }
  }, [state])

  const handleBlur = useCallback(event => {
    setSolString(sol.toString())
  }, [sol])

  const loadClicked = useCallback(() => {
    state.load()
  }, [state])

  return (
    <div>
      <div className={styles.controls}>
        Sol{' '}
        <input type="number" className={styles.solInput} value={solString} onChange={numberChanged} onBlur={handleBlur} min="0" step="1" />
        <button onClick={loadClicked} type="button">Load</button>
      </div>
      <div>
        {solData ?
          <MarsFigureContainer images={solData.images} />
          :
          <p>Not loaded yet</p>
        }
      </div>
    </div>
  )
})
