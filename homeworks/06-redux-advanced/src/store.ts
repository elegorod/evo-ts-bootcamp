import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logSender from "./logSender";
import { reducer } from './reducer'

const store = createStore(reducer, applyMiddleware(thunk, logSender))

export default store
