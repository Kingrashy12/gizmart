import Menu from "@/components/modal/Menu";
import { createContext, useContext, useState } from "react";

const MenuContext = createContext<ModalContextTypes | undefined>(undefined);

export const MenuModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <MenuContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <Menu />}
    </MenuContext.Provider>
  );
};

export const useMenuModal = () => {
  const menu = useContext(MenuContext);
  if (menu === undefined) {
    throw new Error("Menu can't be called outside it provider");
  }
  return menu;
};
