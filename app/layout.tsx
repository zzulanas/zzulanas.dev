import type { Metadata } from "next";
import {
  Outfit,
  Geist,
  Geist_Mono,
  Major_Mono_Display,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { JsonLd } from "@/components/json-ld";
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

const DESCRIPTION =
  "Software engineer in Brooklyn, NY. Streaming SDKs, AI platforms, and 3D things for the web.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zzulanas.dev"),
  title: {
    default: "Zachary Zulanas",
    template: "%s · Zachary Zulanas",
  },
  description: DESCRIPTION,
  applicationName: "zzulanas.dev",
  authors: [{ name: "Zachary Zulanas", url: "https://zzulanas.dev" }],
  creator: "Zachary Zulanas",
  keywords: [
    "Zachary Zulanas",
    "software engineer",
    "Brooklyn",
    "streaming SDK",
    "AI",
    "3D Gaussian splatting",
    "Next.js",
    "WebGL",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "zzulanas.dev",
    title: "Zachary Zulanas",
    description: DESCRIPTION,
    url: "https://zzulanas.dev",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zachary Zulanas",
    description: DESCRIPTION,
    creator: "@zzulanas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zachary Zulanas",
  url: "https://zzulanas.dev",
  jobTitle: "Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/zzulanas",
    "https://linkedin.com/in/zzulanas",
  ],
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "zzulanas.dev",
  url: "https://zzulanas.dev",
  author: { "@type": "Person", name: "Zachary Zulanas" },
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
        <JsonLd data={PERSON_LD} />
        <JsonLd data={WEBSITE_LD} />
      </body>
    </html>
  );
}
