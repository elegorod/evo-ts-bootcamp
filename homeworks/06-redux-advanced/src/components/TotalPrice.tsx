import React from "react";
import { useSelector } from "react-redux";
import { State } from "../types";
import { PizzaPrice } from "./PizzaPrice";

const selectTotalPrice = (state: State) => state.basket.reduce((acc, item) => acc + item.price * item.count, 0)

export function TotalPrice() {
  const price = useSelector(selectTotalPrice)
  return (
    <div className="flex">
      <span>Total price:</span><PizzaPrice price={price} />
    </div>
  );
}
