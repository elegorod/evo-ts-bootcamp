import { Dispatch, Middleware } from "redux";
import { PizzaAction, PizzaActionType } from "./reducer";
import { State } from "./types";

const logSender: Middleware<{}, State, Dispatch<PizzaAction>> = store => next => action => {
  const event = createLogEvent(action, store.getState())
  console.log("Log event", event)
  sendToServer(event)
  next(action)
}

export default logSender

type LogEvent = {
  eventName: string,
  pizzaName?: string,
  pizzaPrice?: number
}

const eventNames = new Map([
  [PizzaActionType.LOAD_LIST, "PIZZA_LIST_VIEWED"],
  [PizzaActionType.ADD_TO_BASKET, "PIZZA_ADDED_TO_BASKET"],
  [PizzaActionType.REMOVE_FROM_BASKET, "PIZZA_REMOVED_FROM_BASKET"]
])
const UnknownEventName = "UNKNOWN_EVENT"

function createLogEvent(action: PizzaAction, state: State): LogEvent {
  const eventName = eventNames.get(action.type) ?? UnknownEventName
  const pizzaId = action.pizzaId
  const pizza = pizzaId ? state.pizza.find(_ => _._id === pizzaId) : undefined
  let event
  if (pizza) {
    event = {
      eventName: eventName,
      pizzaName: pizza.name,
      pizzaPrice: pizza.price
    }
  } else {
    event = {
      eventName: eventName
    }
  }
  return event
}

function sendToServer(event: LogEvent): void {
  fetch("http://localhost:3001/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  }).then(response => response.text())
    .then(text => {
      if (text !== "re") {
        console.log("Unexpected response from log server", text)
      }
    })
    .catch(ex => console.log("Cannot sent log event", ex))
}
