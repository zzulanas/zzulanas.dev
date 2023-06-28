import { Crimson_Pro, Martel_Sans, Palanquin } from "next/font/google";

export const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  display: "swap",
});

export const martelSans = Martel_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const palanquinDark = Palanquin({
  weight: ["100", "200", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
