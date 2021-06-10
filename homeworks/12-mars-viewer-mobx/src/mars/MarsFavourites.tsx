import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { MarsContext } from "./Mars";
import { MarsFigureContainer } from "./MarsFigureContainer";

export const MarsFavourites = observer(() => {
  const state = useContext(MarsContext)
  const images = state.favouriteImages

  return (
    <div>
      <div>
        {images.length > 0 ? 
          <MarsFigureContainer images={images}/>
          :
          <p>No favourites yet. Add them on Photos tab by pressing heart icon.</p>
        }
      </div>
    </div>
  )
})
