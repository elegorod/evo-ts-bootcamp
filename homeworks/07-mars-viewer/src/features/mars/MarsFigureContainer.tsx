import { MarsImage } from "./marsSlice";
import styles from "./MarsFigureContainer.module.css"
import React from "react";
import { MarsFigure } from "./MarsFigure";

interface MarsFigureContainerProps {
  images: MarsImage[]
}

export function MarsFigureContainer(props: MarsFigureContainerProps) {
  return (
    <div className={styles.marsFigureContainer}>
      {props.images.map(image =>
        <MarsFigure image={image} key={image.id} />
      )}
    </div>
  )
}
