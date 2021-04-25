import React from 'react'
import { createStore, Action, Reducer } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import './App.css'

enum AccountActionType {
  UPDATE_BALANCE = "UPDATE_BALANCE",
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
  GET_BALANCE_WITHOUT_TAX = "GET_BALANCE_WITHOUT_TAX",
  GET_BALANCE_WITH_TAX = "GET_BALANCE_WITH_TAX"
}

type AccountActionTypeKey = keyof typeof AccountActionType

interface AccountAction extends Action<AccountActionTypeKey> {
  payload?: number
}

type AccountState = {
  balance: number,
  history: AccountAction[]
}

const reducer: Reducer<AccountState, AccountAction> = (state = { balance: 0, history: [] }, action) => {
  let balance = state.balance
  switch (action.type) {
    case AccountActionType.UPDATE_BALANCE:
    case AccountActionType.CREDIT:
      if (action.payload) {
        balance += action.payload
      }
      break
    case AccountActionType.DEBIT:
      if (action.payload) {
        balance -= action.payload
      }
      break
    case AccountActionType.GET_BALANCE_WITHOUT_TAX:
      // noop
      break
    case AccountActionType.GET_BALANCE_WITH_TAX:
      if (action.payload) {
        balance *= (1 - action.payload / 100)
      }
      break
  }
  return { balance: balance, history: [...state.history, action] };
}

const store = createStore(reducer, devToolsEnhancer({ name: "Main" }))

const array: AccountAction[] = [
  { type: "UPDATE_BALANCE", payload: 1000.0 },
  { type: "CREDIT", payload: 200.0 },
  { type: "CREDIT", payload: 100.0 },
  { type: "GET_BALANCE_WITHOUT_TAX" },
  { type: "DEBIT", payload: 250.0 },
  { type: "UPDATE_BALANCE", payload: 1000.0 },
  { type: "GET_BALANCE_WITH_TAX", payload: 14.0 }
]

array.forEach(action => {
  store.dispatch(action)
  console.log("action", action, "state", store.getState())
})

function App() {
  return (
    <div className="App">
      <p>No UI, see Redux console</p>
    </div>
  )
}

export default App
