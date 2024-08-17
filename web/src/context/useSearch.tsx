import { SearchModal } from "@/components";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext<ModalContextTypes | undefined>(undefined);

export const SearchModalProvider = ({ children }: ContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return (
    <SearchContext.Provider value={{ onClose, isOpen, onOpen }}>
      {children}
      {isOpen && <SearchModal />}
    </SearchContext.Provider>
  );
};

export const useSearchModal = () => {
  const search = useContext(SearchContext);
  if (search === undefined) {
    throw new Error("Can't use modal outside it's provider.");
  }
  return search;
};
