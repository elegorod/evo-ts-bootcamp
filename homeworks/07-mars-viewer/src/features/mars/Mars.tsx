import React, { useCallback, useState } from 'react';

import styles from './Mars.module.css';
import { MarsFavourites } from './MarsFavourites';
import { MarsPhotos } from './MarsPhotos';
import { MarsTab } from './MarsTab';

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
      <div className={styles.tabContainer}>
        <MarsTab selected={tab === Tab.Photos} onClick={photosClicked}>Photos</MarsTab>
        <MarsTab selected={tab === Tab.Favourites} onClick={favouritesClicked}>Favourites</MarsTab>
      </div>
      {tab === Tab.Photos ?
        <MarsPhotos />
        :
        <MarsFavourites />
      }
    </div>
  )
}
