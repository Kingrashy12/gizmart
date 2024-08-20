import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React from "react";
import { ContainerClass } from "@/class";
import { Sign_Up } from "@/components";

const SignUp = () => {
  return (
    <main className={`${ContainerClass} mt-3 ${poppinsFont.className}`}>
      <Head>
        <title>Sign Up - Gizmart</title>
      </Head>
      <Sign_Up />
    </main>
  );
};

export default SignUp;
