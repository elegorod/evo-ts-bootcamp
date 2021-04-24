import React from 'react'
import styles from './Graph.module.css'
import classNames from 'classnames/bind'

interface Props {
  values: number[]
  active: number[]
  firstSorted?: number
}

const moduleClassNames = classNames.bind(styles)

class Graph extends React.Component<Props> {

  render() {
    return <div className={styles.graph}>
      {this.props.values.map((v, i) => {
        const firstSorted = this.props.firstSorted
        const classes = moduleClassNames({
          bar: true,
          active: this.props.active.includes(i),
          sorted: firstSorted !== undefined && i >= firstSorted
        })
        return <div className={classes} style={{ height: v + "px" }} key={i}></div>
      }
      )}
    </div>
  }

}

export default Graph;
