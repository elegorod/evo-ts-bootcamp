import { Action, Reducer } from "redux"
import { Pizza, State } from "./types";

export enum PizzaActionType {
  LOAD_LIST = "LOAD_LIST",
  ADD_TO_BASKET = "ADD_TO_BASKET",
  REMOVE_FROM_BASKET = "REMOVE_FROM_BASKET"
}

export interface PizzaAction extends Action<PizzaActionType> {
  pizzaId?: string,
  pizzas?: Pizza[]
}

const pizzaComparator = (a: Pizza, b: Pizza) => a.name.localeCompare(b.name)

export const reducer: Reducer<State, PizzaAction> = (state = { pizza: [], basket: [] }, action) => {
  let newState = state
  switch (action.type) {
    case PizzaActionType.LOAD_LIST:
      if (action.pizzas) {
        newState = { ...state, pizza: action.pizzas }
      }
      break
    case PizzaActionType.ADD_TO_BASKET:
      newState = addToBasket(state, action)
      break
    case PizzaActionType.REMOVE_FROM_BASKET:
      newState = removeFromBasket(state, action)
      break
  }
  return newState
}

function addToBasket(state: State, action: PizzaAction): State {
  let newState = state
  const pizzaId = action.pizzaId
  const pizza = state.pizza.find(p => p._id === pizzaId)
  if (pizza) {
    const pizzaInBasket = state.basket.find(p => p._id === pizzaId)
    let newBasket
    if (pizzaInBasket) {
      newBasket = [
        ...state.basket.filter(p => p._id !== pizzaId),
        {
          ...pizza,
          count: pizzaInBasket.count + 1
        }
      ]
    } else {
      newBasket = [
        ...state.basket,
        {
          ...pizza,
          count: 1
        }
      ]
    }
    newBasket.sort(pizzaComparator)
    newState = { ...state, basket: newBasket }
  }
  return newState
}

function removeFromBasket(state: State, action: PizzaAction): State {
  let newState = state
  const pizzaId = action.pizzaId
  const pizza = state.pizza.find(p => p._id === pizzaId)
  if (pizza) {
    const pizzaInBasket = state.basket.find(p => p._id === pizzaId)
    let newBasket
    if (pizzaInBasket) {
      const otherPizzas = state.basket.filter(p => p._id !== pizzaId)
      if (pizzaInBasket.count > 1) {
        newBasket = [
          ...otherPizzas,
          {
            ...pizza,
            count: pizzaInBasket.count - 1
          }
        ]
      } else {
        newBasket = otherPizzas
      }
    } else {
      newBasket = state.basket
    }
    newBasket.sort(pizzaComparator)
    newState = { ...state, basket: newBasket }
  }
  return newState
}