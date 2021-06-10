import styles from "./MarsFigureContainer.module.css"
import { MarsFigure } from "./MarsFigure";
import { MarsImage } from "./MarsState";

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
