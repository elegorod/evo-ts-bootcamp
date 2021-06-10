import { observer } from 'mobx-react-lite';
import { createContext, useCallback, useState } from 'react';

import styles from './Mars.module.css';
import { MarsFavourites } from './MarsFavourites';
import { MarsPhotos } from './MarsPhotos';
import MarsState from './MarsState';
import { MarsTab } from './MarsTab';

enum Tab {
  Photos = "Photos",
  Favourites = "Favourites"
}

const marsState = new MarsState()
export const MarsContext = createContext(marsState)

export const Mars = observer(() => {
  const [tab, setTab] = useState(Tab.Photos)

  const photosClicked = useCallback(() => {
    setTab(Tab.Photos)
  }, [setTab])

  const favouritesClicked = useCallback(() => {
    setTab(Tab.Favourites)
  }, [setTab])

  return (
    <MarsContext.Provider value={marsState}>
      <div>
        <div className={styles.tabContainer}>
          <MarsTab selected={tab === Tab.Photos} onClick={photosClicked}>Photos</MarsTab>
          <MarsTab selected={tab === Tab.Favourites} onClick={favouritesClicked}>Favourites</MarsTab>
        </div>
        {tab === Tab.Photos ?
          <MarsPhotos />
          :
          <MarsFavourites/>
        }
      </div>
    </MarsContext.Provider>
  )
})
