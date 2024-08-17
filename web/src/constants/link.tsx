import { Gaming, HeadPhone, Iphone, IWatch, Laptop, Tv } from "@/assets";

export const navlinks = [
  {
    label: "Phones and Tablets",
    url: "/category/phones-and-tablets",
    value: "phones-and-tablets",
  },
  { label: "Laptops", url: "/category/laptops", value: "laptops" },
  { label: "Audio", url: "/category/audio", value: "audio" },
  { label: "Gaming", url: "/category/gaming", value: "gaming" },
  {
    label: "Smart Watch",
    url: "/category/smart-watch",
    value: "smart-watch",
  },
];

export const collectionlinks = [
  {
    label: "Phones and Tablets",
    url: "/category/phones-and-tablets",
    image: Iphone,
    direction: "left",
  },
  {
    label: "Laptops",
    url: "/category/laptops",
    image: Laptop,
    direction: "down",
  },
  {
    label: "Smart watch",
    url: "/category/smart-watch",
    image: IWatch,
    direction: "up",
  },
  {
    label: "Gaming",
    url: "/category/gaming",
    image: Gaming,
    direction: "down",
  },
  {
    label: "Audio",
    url: "/category/audio",
    image: HeadPhone,
    direction: "right",
  },
];

export const footer = {
  shop: [
    { label: "Hot deals", header: "Store", url: "/hot-deals" },
    { label: "Brand", url: "/brand" },
    { label: "Campaign", url: "/campaign" },
    { label: "Categories", url: "/categories" },
    { label: "Sell on Gizmart", url: "/giz/sell" },
  ],
  need_help: [
    { label: "Contact", header: "Need help", url: "/contact" },
    { label: "Track order", url: "/track-order" },
  ],
  contact: [
    { label: "Contact", header: "Support", url: "/contact" },
    { label: "Live chat", url: "/live-chat" },
    { label: "FAQ", url: "/faq" },
    { label: "Report a issue", url: "/report" },
  ],
};
