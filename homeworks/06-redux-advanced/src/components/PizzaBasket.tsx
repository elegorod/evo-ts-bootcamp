import React from "react";
import { PizzaBasketItem } from "./PizzaBasketItem";
import { State } from "../types"
import { useSelector } from "react-redux";

const selectBasket = (state: State) => state.basket

export function PizzaBasket() {
  const basket = useSelector(selectBasket)

  if (basket.length > 0) {
    return (
      <>
        {basket.map((item) =>
          <PizzaBasketItem
            _id={item._id}
            key={item._id}
            price={item.price}
            name={item.name}
            count={item.count}
          />)}
      </>
    );
  } else {
    return <div>Basket is empty</div>
  }

}
