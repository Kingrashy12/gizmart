import { Cart } from "@/components";
import Menu from "@/components/modal/Menu";
import { createContext, useContext, useState } from "react";

const CartContext = createContext<ModalContextTypes | undefined>(undefined);

const CartModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <CartContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <Cart />}
    </CartContext.Provider>
  );
};

export default CartModalProvider;

export const useCartModal = () => {
  const cart = useContext(CartContext);
  if (cart === undefined) {
    throw new Error("CartModal can't be called outside it provider");
  }
  return cart;
};
