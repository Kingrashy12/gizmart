import { useSettingsModal } from "@/context/useSettings";
import { Dialog, DialogPanel } from "@tremor/react";
import React from "react";
import MainCard from "../settings/MainCard";

const SettingModal = () => {
  const { isOpen, onClose } = useSettingsModal();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="inset-0 h-full top-0 z-[700]"
    >
      <DialogPanel className="flex flex-col bg-white p-0 rounded-xl gap-3 pb-3">
        <MainCard onClose={onClose} />
      </DialogPanel>
    </Dialog>
  );
};

export default SettingModal;
