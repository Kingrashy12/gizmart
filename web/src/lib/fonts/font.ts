import { Inter, Poppins, Roboto_Flex } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const robotoFont = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export { inter, poppinsFont, robotoFont };
