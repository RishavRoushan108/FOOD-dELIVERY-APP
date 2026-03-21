"use client";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartlist, setcartlist] = useState([]);
  const [idlist, setidlist] = useState([]);

  useEffect(() => {
    let saveddata = localStorage.getItem("cart");
    if (saveddata) {
      setcartlist(JSON.parse(saveddata));
      setidlist(() =>
        cartlist.map((item) => {
          return item._id;
        }),
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartlist));
    setidlist(() =>
      cartlist.map((item) => {
        return item._id;
      }),
    );
  }, [cartlist]);

  return (
    <cartContext.Provider value={{ idlist, cartlist, setcartlist }}>
      {children}
    </cartContext.Provider>
  );
};
