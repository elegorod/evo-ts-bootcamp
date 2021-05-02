import React from 'react';
import './App.css';
import {
  PizzaList,
  PizzaBasket,
  TotalPrice
} from "./components";
import { getPizza } from "./services/api";
import { ThunkAction } from 'redux-thunk';
import { State } from './types';
import { PizzaAction, PizzaActionType } from './reducer';
import { useDispatch } from 'react-redux';

function loadPizzas(): ThunkAction<Promise<void>, State, {}, PizzaAction> {
  return (dispatch, getState) =>
    getPizza().then(pizzas => {
      dispatch({ type: PizzaActionType.LOAD_LIST, pizzas: pizzas.items })
    })
}

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(loadPizzas())
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 p-8">
        <div className="grid grid-cols-4 gap-4">
          <PizzaList />
        </div>
      </div>
      <div className="col-span-1 bg-white overflow-y-auto h-full">
        <div className="flex flex-col p-8">
          <TotalPrice />
          <PizzaBasket />
          <div className="flex flex-col">
            <button className="bg-yellow-400 rounded-xl pt-2 pb-2">Make Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


