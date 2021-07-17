import { LocalDate } from "@js-joda/core"
import { makeAutoObservable } from "mobx"
import { sumBy, uniq } from "lodash"
import { v4 as uuid } from "uuid"

export default class PortfolioState {

  items: PortfolioItem[] = [
    { id: uuid(), ticker: "IVV", count: 14, price: 375.2, date: LocalDate.of(2021, 2, 1) },
    { id: uuid(), ticker: "VNQ", count: 50, price: 104.5, date: LocalDate.of(2021, 6, 15) },
    { id: uuid(), ticker: "VNQ", count: 10, price: 102, date: LocalDate.of(2021, 6, 30) },
    { id: uuid(), ticker: "SCHD", count: 66, price: 75.8, date: LocalDate.of(2021, 7, 1) }
  ]

  editedItem: EditedPortfolioItem | undefined = undefined

  constructor() {
    makeAutoObservable(this, {})
  }

  add() {
    this.editedItem = {
      id: uuid(),
      ticker: "",
      count: "",
      date: "",
      price: ""
    }
  }

  edit(id: PortfolioItemId) {
    const item = this.items.find(currentItem => currentItem.id === id)
    this.editedItem = item ? {
      id: item.id,
      ticker: item.ticker,
      count: item.count.toString(),
      date: item.date.toString(),
      price: item.price.toString()
    } : undefined
  }

  save() {
    const item = this.editedItem
    if (item) {
      this.updateItem({
        id: item.id,
        ticker: item.ticker,
        count: parseInt(item.count, 10),
        date: LocalDate.parse(item.date),
        price: parseFloat(item.price)
      })
    }
    this.stopEdit()
  }

  private updateItem(item: PortfolioItem) {
    const existingItem = this.items.find(currentItem => currentItem.id === item.id)
    if (existingItem === undefined) {
      this.items.push(item)
    } else {
      existingItem.ticker = item.ticker
      existingItem.count = item.count
      existingItem.date = item.date
      existingItem.price = item.price
    }
  }

  delete() {
    const item = this.editedItem
    if (item) {
      this.items = this.items.filter(currentItem => currentItem.id !== item.id)
    }
    this.stopEdit()
  }

  stopEdit() {
    this.editedItem = undefined
  }

  get investedAmount() {
    return sumBy(this.items, item => item.price * item.count)
  }

  get uniqueTickers() {
    return uniq(this.items.map(item => item.ticker))
  }

  get createMode() {
    const item = this.editedItem
    return item && this.items.findIndex(currentItem => currentItem.id === item.id) === -1
  }

}

export type Ticker = string

export interface PortfolioItem {
  id: PortfolioItemId
  ticker: Ticker
  count: number
  date: LocalDate
  price: number
}

type Edited<T> = Record<keyof T, string>
type EditedPortfolioItem = Edited<PortfolioItem>

type PortfolioItemId = string
