import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React from "react";
import { ContainerClass } from "../class";
import { Login_ } from "@/components";

const Login = () => {
  return (
    <main className={`${ContainerClass} mt-36 ${poppinsFont.className}`}>
      <Head>
        <title>Login - Gizmart</title>
      </Head>
      <Login_ />
    </main>
  );
};

export default Login;
