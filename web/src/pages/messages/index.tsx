import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React, { useEffect } from "react";
import { ContainerClass, RequiredClass } from "../class";
import { ChatPage } from "@/components";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/store";
import toast from "react-hot-toast";

const Message = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user.userLoaded) {
      if (window !== undefined) {
        window.location.href = "/";
        toast.error("You're not authorized to access this page");
      } else {
        router.replace("/");
      }
    }
  }, [router]);
  return (
    <main className={`${ContainerClass} flex-1 ${poppinsFont.className}`}>
      <Head>
        <title>Messages - Gizmart</title>
      </Head>
      <ChatPage />
    </main>
  );
};

export default Message;
