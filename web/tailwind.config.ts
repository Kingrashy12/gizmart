import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#FFBC00",
        softGray: "#F5F5F5",
        primaryGray: "#D9D9D9",
        AliceBlue:"#F0F8FF",
        ProductBg: "#F3F3F3",
        ProductHeader: "#F3EBEB",
        CategoryBg: "#D1D5DB"
      },
      backgroundColor: {
        primaryColor: "#FFBC00",
        softGray: "#F5F5F5",
        primaryGray: "#D9D9D9",
        AliceBlue:"#F0F8FF",
        ProductBg: "#F3F3F3",
        ProductHeader: "#F3EBEB",
        CategoryBg: "#D1D5DB"
      },
      borderColor: {
        softGray: "#F5F5F5",
        primaryGray: "#D9D9D9",
      }
    },
  },
  plugins: [],
};
export default config;
