import React, { useState, createContext, useContext, useEffect } from "react";

interface StateContextProps {
  children?: React.ReactNode;
  qty?: number;
  totalPrice?: any;
  totalQty?: any;
  cartItems?: Array<any>;
  showCart?: boolean;
  checkCart: () => void;
  closeCart: () => void;
  addToCart: (item: Item) => void;
}

interface Item {
  name: string;
  price: number;
  id: string;
  image: any;
}

const state = {
  qty: 1,
  totalPrice: 0,
  totalQty: 0,
  cartItems: [],
  showCart: false,
  // checkCart: ()=> !showCart
};

const Context = createContext<StateContextProps>();

export const StateContext: React.FC<StateContextProps> = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQty, setTotalQty] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (cartItems.length >= 1) {
      setTotalQty(cartItems.length);
    } else {
      setTotalQty(0);
    }
  }, [cartItems]);

  function checkCart() {
    setShowCart(true);
  }
  function closeCart() {
    setShowCart(false);
  }

  function addToCart(item: any) {
    setCartItems(item);
    console.log("pushedItem:", item);
    console.log("cart:", cartItems);
  }

  return (
    <Context.Provider
      value={{
        qty,
        totalPrice,
        totalQty,
        cartItems,
        showCart,
        checkCart,
        closeCart,
        addToCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
