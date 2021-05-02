import React from "react";
import { useSelector } from "react-redux";
import { State } from "../types";
import { Loading } from "./Loading";
import { PizzaItem } from "./PizzaItem";

const selectPizza = (state: State) => state.pizza

export function PizzaList() {
  const pizza = useSelector(selectPizza)

  if (pizza.length > 0) {
    return (
    <>
      {pizza.map(item =>
        <PizzaItem
          key={item._id}
          _id={item._id}
          name={item.name}
          price={item.price}
        />)}
    </>);
  } else {
    return <Loading/>
  }
}
