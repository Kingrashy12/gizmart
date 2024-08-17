import { SellProductModal } from "@/components";
import { createContext, useState, useContext } from "react";

const SellContext = createContext<ModalContextTypes | undefined>(undefined);

export const SellProductModalProvider = ({
  children,
}: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <SellContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <SellProductModal />}
    </SellContext.Provider>
  );
};

export const useSellProductModal = () => {
  const context = useContext(SellContext);
  if (context === undefined) {
    throw new Error("Opps' you tried calling a modal outside it's provider");
  }
  return context;
};
