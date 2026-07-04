import type { Metadata } from "next";
import {
  Outfit,
  Geist,
  Geist_Mono,
  Major_Mono_Display,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-outfit",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// hero display face
const majorMono = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-major-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zzulanas.dev"),
  title: {
    default: "Zachary Zulanas",
    template: "%s · Zachary Zulanas",
  },
  description:
    "Software engineer in Brooklyn, NY. Streaming SDKs, AI platforms, and 3D things for the web.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${geist.variable} ${geistMono.variable} ${majorMono.variable} min-h-dvh antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
