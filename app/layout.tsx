import Nav from "@/components/layout/nav";
import "./globals.css";
import { Suspense } from "react";
import cx from "classnames";
import { Analytics } from "@vercel/analytics/react";

import { crimsonPro, martelSans, palanquinDark } from "./fonts";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "zachary zulanas",
  description: "software engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>zzulanas.dev</title>
        <meta property="og:image" content="https://zzulanas.dev/api/og" />
      </head>
      <body
        className={cx(
          crimsonPro.variable,
          martelSans.className,
          palanquinDark.className
        )}
      >
        <div></div>
        <Suspense fallback={"..."}>
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col md:justify-center content-start pt-32 pb-16 max-w-screen-xl mx-auto">
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}
