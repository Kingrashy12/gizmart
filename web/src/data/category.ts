import { ArrowRight } from "@/assets";
import {
  AirpodsCategory,
  AndroidPhonesCategory,
  CellPhoneCategory,
  ControllerCategory,
  DellCategory,
  EarPhonesCategory,
  FliphonesCategory,
  HeadsetsCategory,
  HpCategory,
  IphoneCategory,
  LenovoCategory,
  MacBookCategory,
  PortableSpaercksCategory,
  PS4Category,
  PS5ConsoleCategory,
  TabletsCategory,
  XboxCategory,
} from "@/assets/categories";
import { Collection } from "@/components/form/VoucherForm";

export const collectionsdata = [
  { label: "Phones And Tablets", value: "phones-and-tablets" },
  { label: "Audio", value: "audio" },
  { label: "Laptop", value: "laptops" },
  { label: "Gaming", value: "gaming" },
];

export const productsCollection = {
  phonesandtablets: {
    collection: "Phones And Tablets",
    value: "phones-and-tablets",
    categories: [
      { label: "Android Phone", value: "android-phone" },
      { label: "Apple", value: "apple" },
      { label: "Tablet", value: "tablet" },
      { label: "Cell Phones", value: "cell-phone" },
      { label: "Flip Phone", value: "flip-phone" },
    ],
  },
  audio: {
    collection: "Audio",
    value: "audio",
    categories: [
      { label: "Earbuds", value: "earbuds" },
      { label: "Headphones", value: "head-phones" },
      { label: "Wireless Earphones", value: "wireless-earphones" },
      { label: "Portable Spearker", value: "portable-spearkers" },
    ],
  },
  laptops: {
    collection: "Laptops",
    value: "laptops",
    categories: [
      { label: "Mac-Os", value: "mac-os" },
      { label: "Lenovo", value: "lenovo" },
      { label: "Hp", value: "hp" },
      { label: "Dell", value: "dell" },
      { label: "Others", value: "others" },
    ],
  },
  gaming: {
    collection: "Gaming",
    value: "gaming",
    categories: [
      { label: "Controller", value: "controllers" },
      { label: "PS4 Console", value: "ps4-console" },
      { label: "PS5 Console", value: "ps5-console" },
      { label: "Xbox", value: "xbox" },
    ],
  },
};

export const phonesCategories = [
  {
    category: "Android Phone",
    url: "/category/phones-and-tablets/android-phone",
    image: AndroidPhonesCategory,
  },
  {
    category: "Apple",
    url: "/category/phones-and-tablets/apple",
    image: IphoneCategory,
  },
  {
    category: "Tablet",
    url: "/category/phones-and-tablets/tablet",
    image: TabletsCategory,
  },
  {
    category: "Cell Phone",
    url: "/category/phones-and-tablets/cell-phone",
    image: CellPhoneCategory,
  },
  {
    category: "Flip Phone",
    url: "/category/phones-and-tablets/flip-phone",
    image: FliphonesCategory,
  },
];
export const audioCategories = [
  {
    category: "Earbuds",
    url: "/category/audio/earbuds",
    image: AirpodsCategory,
  },
  {
    category: "Headphones",
    url: "/category/audio/head-phones",
    image: HeadsetsCategory,
  },
  {
    category: "Portable Spearkers",
    url: "/category/audio/portable-spearkers",
    image: PortableSpaercksCategory,
  },
  {
    category: "Wireless Earphones",
    url: "/category/audio/wireless-earphones",
    image: EarPhonesCategory,
  },
];
export const laptopCategories = [
  {
    category: "Mac-Os",
    url: "/category/laptops/mac-os",
    image: MacBookCategory,
  },
  {
    category: "Lenovo",
    url: "/category/laptops/lenovo",
    image: LenovoCategory,
  },
  { category: "Dell", url: "/category/laptops/dell", image: DellCategory },
  { category: "Hp", url: "/category/laptops/hp", image: HpCategory },
  {
    category: "Others",
    url: "/category/laptops/others",
    image: ArrowRight,
  },
];
export const gamingCategories = [
  {
    category: "PS4 Console",
    url: "/category/category/ps4-console",
    image: PS4Category,
  },
  {
    category: "Controller",
    url: "/category/category/controllers",
    image: ControllerCategory,
  },
  {
    category: "PS5 Console",
    url: "/category/category/ps5-console",
    image: PS5ConsoleCategory,
  },
  { category: "Xbox", url: "/category/category/xbox", image: XboxCategory },
];
