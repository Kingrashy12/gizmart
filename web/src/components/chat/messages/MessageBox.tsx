import { Flex, StaticImage } from "@/lib";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImagePlus } from "react-icons/lu";
import { SmileEmoji } from "@/assets";
import { TextInput } from "@tremor/react";
import { MdSend } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { sendMessage } from "@/redux/thunks/message";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SelectedImages from "./SelectedImages";
import toast from "react-hot-toast";

interface MessageBoxProps {
  chat: ChatType;
  isEmojiOpen: boolean;
  setIsEmojiOpen: Dispatch<SetStateAction<boolean>>;
}

const MessageBox = ({ chat, isEmojiOpen, setIsEmojiOpen }: MessageBoxProps) => {
  const [chosenEmoji, setChosenEmoji] = useState<any>(null);
  const [openImage, setOpenImage] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const messageState = useAppSelector((state) => state.message);
  const isSending = messageState.sendStatus === "pending";

  const [form, setForm] = useState<any>({
    senderId: user.userId,
    chatId: chat._id,
    message: "",
    images: [],
  });

  const onEmojiClick = (value: any) => {
    setChosenEmoji(value);
    setIsEmojiOpen(false);
    setForm((prevForm: any) => ({
      ...prevForm,
      message: prevForm.message + value.emoji,
    }));
    // console.log("emoji:", value);
  };

  function openEmoji(e: React.ChangeEvent) {
    e.stopPropagation();
    setIsEmojiOpen(true);
  }

  function onSend() {
    dispatch(sendMessage(form));
    setForm({ ...form, message: "", images: [] });
  }

  function onKeySend(event: React.KeyboardEvent) {
    if (form.message || form.images.length >= 1) {
      if (event.key === "Enter") {
        dispatch(sendMessage(form));
        setForm({ ...form, message: "", images: [] });
      }
    } else {
      if (event.key === "Enter") {
        toast.error("You can't send an empty request");
      }
    }
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    setOpenImage(true);
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setForm((prevForm: any) => ({
          ...prevForm,
          images: [...prevForm.images, newImage],
        }));
        console.log("image:", form.images);
      };
      reader.readAsDataURL(files[0]);
    }
  }

  function closeI() {
    setOpenImage(false);
    setForm({ ...form, images: [] });
  }
  function onApply() {
    setOpenImage(false);
  }

  function removeImage(index: number) {
    const updatedImages = form.images.filter(
      (image: any, _i: number) => _i !== index
    );
    setForm({ ...form, images: updatedImages });
  }

  return (
    <Flex
      className="p-3 border-t bg-white gap-3 items-center max-[550px]:fixed max-[550px]:bottom-0 max-[550px]:z-10"
      onClick={() => setIsEmojiOpen(false)}
    >
      <SelectedImages
        isOpen={openImage}
        closeSelection={closeI}
        images={form.images}
        handleImage={() => imgRef.current?.click()}
        removeImage={removeImage}
        onApply={onApply}
      />
      {isEmojiOpen ? (
        <div className="absolute bottom-1 z-[700]">
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
      <div className="flex flex-col relative">
        <p
          className={`right-0 absolute w-4 h-4 text-white p-1 flex items-center justify-center text-[10px] rounded-full bg-green-300 ${
            form.images.length < 1 && "hidden"
          }`}
        >
          {form.images.length}
        </p>
        <LuImagePlus
          className="cursor-pointer p-1 hover:bg-neutral-100 rounded-lg"
          size={30}
          onClick={() => imgRef.current?.click()}
        />
      </div>
      <input
        type="file"
        hidden
        ref={imgRef}
        onChange={handleImage}
        accept="image/png, image/jpeg"
      />
      <TextInput
        icon={AiOutlineLoading3Quarters}
        placeholder="Type message..."
        value={form.message}
        className={`${isSending ? "spinner-input" : "input-svg_"}`}
        onKeyUp={onKeySend}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
      />
      <MdSend
        size={25}
        onClick={onSend}
        className={`${
          form.message || form.images.length >= 1
            ? "cursor-pointer"
            : "cursor-not-allowed opacity-75"
        }`}
      />
    </Flex>
  );
};

export default MessageBox;
