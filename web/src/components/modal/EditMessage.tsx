import { useEditMessage } from "@/context/useEditMessage";
import { Dialog, DialogPanel } from "@tremor/react";
import { Flex, StaticImage } from "@/lib";
import React, { Dispatch, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { SmileEmoji } from "@/assets";
import { TextInput } from "@tremor/react";
import { MdSend } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { replace_message } from "@/redux/messageSlice";
import { editMessage } from "@/redux/thunks/message";

const EditMessage = () => {
  const { isOpen, onClose } = useEditMessage();
  const [chosenEmoji, setChosenEmoji] = useState<any>(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const messageState = useAppSelector((state) => state.message);
  const isEditing = messageState.editStatus === "pending";
  const to_edit = messageState.actionMessage;

  const [form, setForm] = useState({
    userId: user.userId,
    // chatId: to_edit.chatId,
    message: to_edit.message,
    messageId: to_edit._id,
  });

  const onEmojiClick = (value: any) => {
    setChosenEmoji(value);
    setIsEmojiOpen(false);
    setForm((prevForm) => ({
      ...prevForm,
      message: prevForm.message + value.emoji,
    }));
    console.log("emoji:", value);
  };

  function openEmoji(e: React.ChangeEvent) {
    e.stopPropagation();
    setIsEmojiOpen(true);
  }

  function onSend() {
    // dispatch(sendMessage(form));
    setForm({ ...form, message: "" });
  }

  function onKeySend(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      dispatch(editMessage(form));
      setForm({ ...form, message: "" });
    }
  }

  function closeEdit() {
    if (!isEditing) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onClose={closeEdit}>
      <DialogPanel
        style={{
          background: "white",
          borderStyle: "none",
          borderWidth: 0,
          borderColor: "white",
        }}
      >
        <Flex
          className="bg-white gap-3 items-center"
          onClick={() => setIsEmojiOpen(false)}
        >
          {isEmojiOpen ? (
            <div className="absolute self-center z-[700]">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          ) : (
            <>
              <StaticImage
                src={chosenEmoji ? chosenEmoji?.imageUrl : SmileEmoji}
                className="w-[30px] cursor-pointer p-1 hover:bg-neutral-100 rounded-full"
                width={30}
                height={30}
                alt="SmileEmoji"
                onClick={openEmoji}
              />
            </>
          )}
          <TextInput
            icon={AiOutlineLoading3Quarters}
            placeholder="Edit message..."
            value={form.message}
            className={`${isEditing ? "spinner-input" : "input-svg_"}`}
            onKeyUp={onKeySend}
            onChange={(event) =>
              setForm({ ...form, message: event.target.value })
            }
          />
          {/* <MdSend
        size={25}
        // onClick={onSend}
        className={`${
          form.message ? "cursor-pointer" : "cursor-not-allowed opacity-75"
        }`}
      /> */}
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default EditMessage;
