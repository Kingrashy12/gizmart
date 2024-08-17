import { Successful } from "@/components";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CongratsContext = createContext<ModalContextTypes | undefined>(undefined);

const CongratsProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <CongratsContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <Successful />}
    </CongratsContext.Provider>
  );
};

export const useCongrats = () => {
  const context = useContext(CongratsContext);
  if (context === undefined) {
    toast.error("Can't use modal outside it provider");
    throw new Error("Can't use modal outside it provider");
  }
  return context;
};

export default CongratsProvider;
