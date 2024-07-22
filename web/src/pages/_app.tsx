import { Layout } from "@/components";
import { CartModalProvider } from "@/context";
import { MenuModalProvider } from "@/context/useMenu";
import { store } from "@/redux/sore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MenuModalProvider>
        <CartModalProvider>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </CartModalProvider>
      </MenuModalProvider>
    </Provider>
  );
}
