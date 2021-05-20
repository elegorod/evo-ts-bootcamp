import React, { useCallback, useState } from 'react';

import styles from './Mars.module.css';
import { MarsFavourites } from './MarsFavourites';
import { MarsPhotos } from './MarsPhotos';

enum Tab {
  Photos = "Photos",
  Favourites = "Favourites"
}

export function Mars() {
  const [tab, setTab] = useState(Tab.Photos)

  const photosClicked = useCallback(() => {
    setTab(Tab.Photos)
  }, [setTab])

  const favouritesClicked = useCallback(() => {
    setTab(Tab.Favourites)
  }, [setTab])

  return (
    <div>
      {tab === Tab.Photos ?
        <>
          <div className={styles.tabContainer}>
            <button className={styles.activeTab} disabled>Photos</button>
            <button className={styles.selectableTab} onClick={favouritesClicked} type="button">Favourites</button>
          </div>
          <MarsPhotos />
        </>
        :
        <>
          <div className={styles.tabContainer}>
            <button className={styles.selectableTab} onClick={photosClicked} type="button">Photos</button>
            <button className={styles.activeTab} disabled>Favourites</button>
          </div>
          <MarsFavourites />
        </>
      }
    </div>
  )
}
