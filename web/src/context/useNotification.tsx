import { NotificationModal } from "@/components";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const NotificationContext = createContext<ModalContextTypes | undefined>(
  undefined
);

const NotificationModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <NotificationContext.Provider value={{ onClose, isOpen, onOpen }}>
      {children}
      {isOpen && <NotificationModal />}
    </NotificationContext.Provider>
  );
};

export const useNotificationModal = () => {
  const search = useContext(NotificationContext);
  if (search === undefined) {
    toast.error("Can't use modal outside it's provider.");
    throw new Error("Can't use modal outside it's provider.");
  }
  return search;
};

export default NotificationModalProvider;
