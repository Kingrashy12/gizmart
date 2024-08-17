import { SettingModal } from "@/components";
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext<ModalContextTypes | undefined>(undefined);

export const SettingsModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <SettingsContext.Provider value={{ onClose, isOpen, onOpen }}>
      {children}
      {isOpen && <SettingModal />}
    </SettingsContext.Provider>
  );
};

export const useSettingsModal = () => {
  const settings = useContext(SettingsContext);
  if (settings === undefined) {
    throw new Error("Can't use modal outside it's provider.");
  }
  return settings;
};
