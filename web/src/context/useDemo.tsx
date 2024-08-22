import { Checkout, DemoLogin } from "@/components";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const DemoUsersContext = createContext<ModalContextTypes | undefined>(
  undefined
);

const DemoUsersModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <DemoUsersContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <DemoLogin />}
    </DemoUsersContext.Provider>
  );
};

export const useDemoUsers = () => {
  const context = useContext(DemoUsersContext);
  if (context === undefined) {
    toast.error("Can't use modal outside it provider");
    throw new Error("Can't use modal outside it provider");
  }
  return context;
};

export default DemoUsersModalProvider;
