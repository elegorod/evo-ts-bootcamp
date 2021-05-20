
import { addToFavourites, MarsImage, removeFromFavourites, selectInFavourites } from './marsSlice'

import styles from './MarsFigure.module.css'
import heartUnselected from './heart-unselected.svg'
import heartSelected from './heart-selected.svg'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

export function MarsFigure({ image }: { image: MarsImage }) {
  const inFavourites = useAppSelector(selectInFavourites(image.id))
  const dispatch = useAppDispatch()
  const addToFavouritesClicked = useCallback((event) => {
    dispatch(addToFavourites(image.id))
  }, [dispatch, image.id])
  const removeFromFavouritesClicked = useCallback((event) => {
    dispatch(removeFromFavourites(image.id))
  }, [dispatch, image.id])

  return (
    <figure className={styles.marsFigure}>
      <img src={image.src} alt="" />
      <figcaption>{image.caption}</figcaption>
      {inFavourites ? 
        <img className={styles.heart} src={heartSelected} onClick={removeFromFavouritesClicked} alt="Remove from favourites"/>
        :
        <img className={styles.heart} src={heartUnselected} onClick={addToFavouritesClicked} alt="Add to favourites"/>
      }
    </figure>
  )
}