import { GenerateVoucher } from "@/components";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const GenVoucherContext = createContext<ModalContextTypes | undefined>(
  undefined
);

export const GenVoucherProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <GenVoucherContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <GenerateVoucher />}
    </GenVoucherContext.Provider>
  );
};

export const useGenVoucherModal = () => {
  const context = useContext(GenVoucherContext);
  if (context === undefined) {
    toast.error("Opps! can't call a modal outside it provider");
    throw new Error("Opps! can't call a modal outside it provider");
  }
  return context;
};
