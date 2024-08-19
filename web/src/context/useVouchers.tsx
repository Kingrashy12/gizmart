import Vouchers from "@/components/modal/Vouchers";
import { createContext, useState, useContext } from "react";

const VoucherContext = createContext<ModalContextTypes | undefined>(undefined);
const VoucherModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <VoucherContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <Vouchers />}
    </VoucherContext.Provider>
  );
};

export default VoucherModalProvider;

export const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (context === undefined) {
    throw new Error("Opps' you tried calling a modal outside it's provider");
  }
  return context;
};
