import styles from './MarsFigure.module.css'
import heartUnselected from './heart-unselected.svg'
import heartSelected from './heart-selected.svg'
import { useCallback, useContext } from 'react'
import { MarsImage } from './MarsState'
import { MarsContext } from './Mars'
import { observer } from 'mobx-react-lite'
import { computed } from 'mobx'

export const MarsFigure = observer(({ image }: { image: MarsImage }) => {
  const state = useContext(MarsContext)
  const inFavourites = computed(() => state.favourites.includes(image.id)).get()
  const addToFavouritesClicked = useCallback((event) => {
    state.addToFavourites(image.id)
  }, [state, image.id])
  const removeFromFavouritesClicked = useCallback((event) => {
    state.removeFromFavourites(image.id)
  }, [state, image.id])

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
})
