import { BackgroundLoader, Cart } from "@/components";
import Menu from "@/components/modal/Menu";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<ModalContextTypes | undefined>(undefined);

const BackgroundLoaderProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [autoOpen]);

  function initializeAutoOpen(condition: boolean) {
    setAutoOpen(condition);
  }

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <CartContext.Provider
      value={{ isOpen, onClose, onOpen, initializeAutoOpen }}
    >
      {children}
      {isOpen ? <BackgroundLoader /> : null}
    </CartContext.Provider>
  );
};

export default BackgroundLoaderProvider;

export const useBackgroundLoader = () => {
  const cart = useContext(CartContext);
  if (cart === undefined) {
    throw new Error("BackgroundLoader can't be called outside it provider");
  }
  return cart;
};
