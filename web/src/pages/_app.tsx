import { Layout } from "@/components";
import {
  CartModalProvider,
  BackgroundLoaderProvider,
  EditMessageProvider,
  CongratsProvider,
  NotificationModalProvider,
  UsersModalProvider,
  DemoUsersModalProvider,
} from "@/context";
import { CheckOutProvider } from "@/context/useCheckout";
import { GenVoucherProvider } from "@/context/useGenVoucher";
import { MenuModalProvider } from "@/context/useMenu";
import { SearchModalProvider } from "@/context/useSearch";
import { SellProductModalProvider } from "@/context/useSell";
import { SettingsModalProvider } from "@/context/useSettings";
import VoucherModalProvider from "@/context/useVouchers";
import { checkType, loadUser } from "@/redux/authSlice";
import { store } from "@/redux/sore";
import { getProducts } from "@/redux/thunks/product";
import { getDemoAccounts } from "@/redux/thunks/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

store.dispatch(loadUser());
store.dispatch(getProducts());
store.dispatch(getDemoAccounts());
store.dispatch(checkType());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <BackgroundLoaderProvider>
        <SettingsModalProvider>
          <CongratsProvider>
            <CheckOutProvider>
              <SellProductModalProvider>
                <UsersModalProvider>
                  <MenuModalProvider>
                    <CartModalProvider>
                      <SearchModalProvider>
                        <NotificationModalProvider>
                          <Layout>
                            <Toaster />
                            <GenVoucherProvider>
                              <EditMessageProvider>
                                <VoucherModalProvider>
                                  <DemoUsersModalProvider>
                                    <Component {...pageProps} />
                                  </DemoUsersModalProvider>
                                </VoucherModalProvider>
                              </EditMessageProvider>
                            </GenVoucherProvider>
                          </Layout>
                        </NotificationModalProvider>
                      </SearchModalProvider>
                    </CartModalProvider>
                  </MenuModalProvider>
                </UsersModalProvider>
              </SellProductModalProvider>
            </CheckOutProvider>
          </CongratsProvider>
        </SettingsModalProvider>
      </BackgroundLoaderProvider>
    </Provider>
  );
}
