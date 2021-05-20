import React from "react";
import { useAppSelector } from "../../app/hooks";
import { MarsFigureContainer } from "./MarsFigureContainer";
import { selectFavouriteImages } from "./marsSlice";

export function MarsFavourites() {
  const images = useAppSelector(selectFavouriteImages)

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
}


