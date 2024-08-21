import { SellProductModal } from "@/components";
import UsersModal from "@/components/modal/UsersModal";
import { createContext, useState, useContext } from "react";

const UsersContext = createContext<ModalContextTypes | undefined>(undefined);

const UsersModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <UsersContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <UsersModal />}
    </UsersContext.Provider>
  );
};

export default UsersModalProvider;

export const useUsersModal = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("Opps' you tried calling a modal outside it's provider");
  }
  return context;
};
