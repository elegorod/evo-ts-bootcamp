import React from 'react';
import styles from './App.module.css'

const MIN_HEIGHT = 200

interface Props {}
interface State {
  loadedCount: number
}

class App extends React.Component<Props, State> {

  state = {
    loadedCount: 0
  }
  images: HTMLImageElement[] = []

  componentDidMount() {
    for (let i = 1; i <= 35; i++) {
      const image = new Image()
      image.onload = this.imageLoaded.bind(this)
      image.src = require(`./images/${i}.jpg`).default
      this.images.push(image)
    }
  }

  imageLoaded() {
    this.setState(state => ({loadedCount: state.loadedCount + 1}))
  }

  render() {
    const imageElements = this.images.filter(image => image.complete).map(image => {
      const width = image.width / image.height * MIN_HEIGHT
      return <div className={styles.imageWrapper} style={{ width: width + "px", flexGrow: width }} key={image.src}>
        <div style={{ paddingBottom: image.height / image.width * 100 + "%" }}></div>
        <img className={styles.resultImage} src={image.src} alt="" />
      </div>
    })
    return (
      <div className={styles.app}>
        <header>
          <h2>Image layout</h2>
        </header>

        <div className={styles.imageContainer}>
          {imageElements}
        </div>
      </div>
    );
  }
}


export default App;
