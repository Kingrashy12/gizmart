import { lazy } from "react";

export { default as Navbar } from "./layout/Navbar";
export { default as Cart } from "./modal/Cart";
export { default as Footer } from "./layout/Footer";
export { default as Layout } from "./layout/Layout";
export { default as Sign_Up } from "./auth/sign-up/Sign_Up";
export { default as Login_ } from "./auth/Login_";
export { default as HeroSection } from "./home/HeroSection";
export { default as Collections } from "./home/Collections";
export { default as ProductSection } from "./home/ProductSection";
export { default as ScrollTop } from "./ScrollTop";
export { default as FlashSales } from "./campaign/deals/Campaign";
export { default as HighDiscount } from "./campaign/deals/HighDiscount";
export { default as SearchModal } from "./modal/SearchModal";
export { default as Dashboard } from "./user/dashoard/Dashboard";
export { default as Campaigns } from "./campaign/Campaign";
export { default as SellerInfo } from "./user/seller/SellerInfo";
export { default as Vouchers } from "./voucher/Vouchers";
export { default as GenerateVoucher } from "./modal/GenerateVoucher";
export { default as SettingModal } from "./modal/SettingModal";
export { default as SellProductModal } from "./modal/SellProductModal";
export { default as IconWrap } from "./icons/Icon";
export { default as SellFormModal } from "./modal/SellFormModal";
export { default as BackgroundLoader } from "./loader/BackgroundLoader";
export { default as Check } from "./indicator/Check";
export { default as ChatPage } from "./chat/Page";
export { default as OnlineStatus } from "./indicator/OnlineStatus";
export { default as MessageAlert } from "./indicator/MessageAlert";
export { default as Checkout } from "./modal/Checkout";
export { default as EditMessage } from "./modal/EditMessage";
export { default as Successful } from "./modal/Successful";
export { default as NotificationModal } from "./modal/Notification";

export const RecommendedProduct = lazy(() => import("./products/Recommended"));
export const Queried = lazy(() => import("./products/Queried"));
export const Seller = lazy(() => import("./products/Seller"));
export const Brand_Store = lazy(() => import("./products/Brand_Store"));
export const CollectionContainer = lazy(
  () => import("./products/collection/Container")
);
export const Current = lazy(() => import("./products/Current"));
export const Marchants = lazy(() => import("./order/marchants/Marchants"));
export const OrdersContainer = lazy(() => import("./order/OrdersContainer"));
export const PackageHistory = lazy(() => import("./order/view/PackageHistory"));
export const OrderContainer = lazy(() => import("./order/view/Container"));
