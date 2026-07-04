import type { Metadata } from "next";
import { getSerializedPosts } from "@/lib/serialized";
import { Desktop } from "@/components/desktop/desktop";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zachary Zulanas — software engineer in Brooklyn, NY. Streaming SDKs, AI platforms, and 3D things for the web.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Zachary Zulanas",
    description:
      "Software engineer in Brooklyn, NY. Streaming SDKs, AI platforms, and 3D things for the web.",
    url: "/about",
    type: "profile",
  },
};

export default async function AboutPage() {
  const posts = await getSerializedPosts();
  return <Desktop posts={posts} initial={{ section: "about", slug: null }} />;
}
