import { EditMessage } from "@/components";
import { useAppDispatch } from "@/hooks/store";
import { removeAction } from "@/redux/messageSlice";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const EditContext = createContext<ModalContextTypes | undefined>(undefined);

const EditContextProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    dispatch(removeAction());
    setIsOpen(false);
  }

  return (
    <EditContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <EditMessage />}
    </EditContext.Provider>
  );
};

export const useEditMessage = () => {
  const context = useContext(EditContext);
  if (context === undefined) {
    toast.error("You tried calling edit modal outside it provider");
    throw new Error("You tried calling edit modal outside it provider");
  }
  return context;
};

export default EditContextProvider;
