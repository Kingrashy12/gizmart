import { Gaming, HeadPhone, Iphone, IWatch, Laptop, Tv } from "@/assets";

export const navlinks = [
  { label: "Phones and Tablets", url: "/collection/phones-and-tablets" },
  { label: "Laptops", url: "/collection/laptops" },
  { label: "Televisions", url: "/collection/television" },
  { label: "Audio", url: "/collection/audio" },
  { label: "Gaming", url: "/collection/gaming" },
  { label: "Smart Watch", url: "/collection/smart-watch" },
];

export const collectionlinks = [
  {
    label: "Phones and Tablets",
    url: "/collection/phones-and-tablets",
    image: Iphone,
    direction: "left",
  },
  {
    label: "Televisions",
    url: "/collection/television",
    image: Tv,
    direction: "up",
  },
  {
    label: "Laptops",
    url: "/collection/laptops",
    image: Laptop,
    direction: "down",
  },
  {
    label: "Smart watch",
    url: "/collection/smart-watch",
    image: IWatch,
    direction: "up",
  },
  {
    label: "Gaming",
    url: "/collection/gaming",
    image: Gaming,
    direction: "down",
  },
  {
    label: "Audio",
    url: "/collection/audio",
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
  ],
  need_help: [
    { label: "Contact", header: "Need help", url: "/contact" },
    { label: "Track order", url: "/track-order" },
    { label: "Upgrade to marchant", url: "/upgrade" },
  ],
  contact: [
    { label: "Contact", header: "Support", url: "/contact" },
    { label: "Live chat", url: "/live-chat" },
    { label: "FAQ", url: "/faq" },
    { label: "Report a issue", url: "/report" },
  ],
};
