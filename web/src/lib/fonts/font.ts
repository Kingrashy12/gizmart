import {
  Inter,
  Poppins,
  Roboto_Flex,
  Plus_Jakarta_Sans,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const robotoFont = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export { inter, poppinsFont, robotoFont, jakarta };
