import { Checkout } from "@/components";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CheckoutContext = createContext<ModalContextTypes | undefined>(undefined);

export const CheckOutProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <CheckoutContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <Checkout />}
    </CheckoutContext.Provider>
  );
};

export const useCheckOutModal = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    toast.error("Can't use modal outside it provider");
    throw new Error("Can't use modal outside it provider");
  }
  return context;
};
