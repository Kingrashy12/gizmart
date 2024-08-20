import { useSettingsModal } from "@/context/useSettings";
import { Dialog, DialogPanel } from "@tremor/react";
import React, { useState } from "react";
import MainCard from "../settings/MainCard";
import Password from "../settings/Password";
import Email from "../settings/Email";
import PersonalInfo from "../settings/PersonalInfo";
import Address from "../settings/Address";
import AddAddress from "../form/AddAddress";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";

const getCurrent = (
  current: SettingsCurrentType,
  onClose: () => void,
  onClick: React.Dispatch<React.SetStateAction<SettingsCurrentType>>
) => {
  switch (current) {
    case "password":
      return <Password exitChange={onClick} />;
    case "email":
      return <Email exitCurrent={onClick} />;
    case "info":
      return <PersonalInfo exitCurrent={onClick} />;
    case "address":
      return <Address exitCurrent={onClick} />;
    case "add-address":
      return <AddAddress exitCurrent={onClick} />;
    default:
      return <MainCard onClose={onClose} exitChange={onClick} />;
  }
};

const SettingModal = () => {
  const { isOpen, onClose } = useSettingsModal();
  const { isOpen: loaderOpen } = useBackgroundLoader();
  const [current, setCurrent] = useState<SettingsCurrentType>("");

  function log() {}

  return (
    <Dialog
      open={isOpen}
      onClose={loaderOpen ? log : onClose}
      className={`inset-0 h-full top-0 z-[700] ${
        loaderOpen ? "cursor-not-allowed" : ""
      }`}
    >
      <DialogPanel className="flex flex-col bg-white p-0 rounded-xl gap-3 pb-3">
        {getCurrent(current, onClose, setCurrent)}
      </DialogPanel>
    </Dialog>
  );
};

export default SettingModal;
