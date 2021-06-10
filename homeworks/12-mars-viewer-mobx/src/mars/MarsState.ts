import { action, computed, flow, makeAutoObservable } from "mobx"
import { loadData, MarsApiResponse } from "./marsApi"

export default class MarsState {

  sol: number = 0
  solData: SolData[] = []
  favourites: number[] = []

  constructor() {
    makeAutoObservable(this, {
      setSol: action,
      addToFavourites: action,
      removeFromFavourites: action,
      load: flow,
      favouriteImages: computed
    })
  }

  setSol(value: number) {
    this.sol = value
  }

  addToFavourites(id: number) {
    this.favourites.push(id)
  }

  removeFromFavourites(id: number) {
    const index = this.favourites.indexOf(id)
    if (index >= 0) {
      this.favourites.splice(index, 1)
    }
  }

  *load() {
    const sol = this.sol
    const loadedData: MarsApiResponse = yield loadData(this.sol)
    let data = this.solData.find(_ => _.sol === sol)
    let dataCreated = false
    if (!data) {
      data = { sol: sol, images: [] }
      dataCreated = true
    }
    data.images = loadedData.photos.map(item => ({
      id: item.id,
      src: item.img_src,
      caption: item.rover.name + ", " + item.camera.full_name
    }))
    if (dataCreated) {
      this.solData.push(data)
    }
  }

  get currentSolData() {
    return this.solData.find(_ => _.sol === this.sol)
  }

  get favouriteImages() {
    return this.solData.flatMap(solData => 
      solData.images.filter(_ => this.favourites.includes(_.id)))
  }

}

export interface SolData {
  sol: number
  images: MarsImage[]
}

export interface MarsImage {
  id: number
  src: string
  caption: string
}