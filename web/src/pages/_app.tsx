import { Layout } from "@/components";
import {
  CartModalProvider,
  BackgroundLoaderProvider,
  EditMessageProvider,
  CongratsProvider,
  NotificationModalProvider,
} from "@/context";
import { CheckOutProvider } from "@/context/useCheckout";
import { GenVoucherProvider } from "@/context/useGenVoucher";
import { MenuModalProvider } from "@/context/useMenu";
import { SearchModalProvider } from "@/context/useSearch";
import { SellProductModalProvider } from "@/context/useSell";
import { SettingsModalProvider } from "@/context/useSettings";
import { loadUser } from "@/redux/authSlice";
import { store } from "@/redux/sore";
import { getProducts } from "@/redux/thunks/product";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

store.dispatch(loadUser());
store.dispatch(getProducts());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SettingsModalProvider>
        <BackgroundLoaderProvider>
          <CongratsProvider>
            <CheckOutProvider>
              <SellProductModalProvider>
                <MenuModalProvider>
                  <CartModalProvider>
                    <SearchModalProvider>
                      <NotificationModalProvider>
                        <Layout>
                          <Toaster />
                          <GenVoucherProvider>
                            <EditMessageProvider>
                              <Component {...pageProps} />
                            </EditMessageProvider>
                          </GenVoucherProvider>
                        </Layout>
                      </NotificationModalProvider>
                    </SearchModalProvider>
                  </CartModalProvider>
                </MenuModalProvider>
              </SellProductModalProvider>
            </CheckOutProvider>
          </CongratsProvider>
        </BackgroundLoaderProvider>
      </SettingsModalProvider>
    </Provider>
  );
}
