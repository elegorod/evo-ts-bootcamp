import React, { useCallback, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './MarsPhotos.module.css';
import { load, selectCurrentSolData, selectSol, setSol } from './marsSlice';
import { MarsFigureContainer } from './MarsFigureContainer';

export function MarsPhotos() {
  const sol = useAppSelector(selectSol)
  const solData = useAppSelector(selectCurrentSolData)
  const dispatch = useAppDispatch()

  const [solString, setSolString] = useState(sol.toString())

  const numberChanged = useCallback(event => {
    const solValue = event.target.value
    setSolString(solValue)
    const sol = parseInt(solValue)
    if (isFinite(sol)) {
      dispatch(setSol(sol))
    }
  }, [dispatch])

  const handleBlur = useCallback(event => {
    setSolString(sol.toString())
  }, [sol])

  const loadClicked = useCallback(() => {
    dispatch(load(sol))
  }, [dispatch, sol])

  return (
    <div>
      <div className={styles.controls}>
        Sol{' '}
        <input type="number" className={styles.solInput} value={solString} onChange={numberChanged} onBlur={handleBlur} min="0" step="1" />
        <button onClick={loadClicked} type="button">Load</button>
      </div>
      <div>
        {solData ? 
          <MarsFigureContainer images={solData.images}/>
          :
          <p>Not loaded yet</p>
        }
      </div>
    </div>
  )
}
