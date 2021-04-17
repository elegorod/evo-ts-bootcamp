import React from 'react';
import styles from './Graph.module.css';

interface Props {
  values: number[]
  active: number[]
  firstSorted?: number
}

class Graph extends React.Component<Props> {

  render() {
    return <div className={styles.graph}>
      {this.props.values.map((v, i) => {
        const classNames = [styles.bar]
        if (this.props.active.includes(i)) {
          classNames.push(styles.active)
        }
        const firstSorted = this.props.firstSorted
        if (firstSorted !== undefined && i >= firstSorted) {
          classNames.push(styles.sorted)
        }
        return <div className={classNames.join(" ")} style={{ height: v + "px" }} key={i}></div>
      }
      )}
    </div>
  }

}

export default Graph;
