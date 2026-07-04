import type { Metadata } from "next";
import { getSerializedPosts } from "@/lib/serialized";
import { getAllPosts } from "@/lib/posts";
import { Desktop } from "@/components/desktop/desktop";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes by Zachary Zulanas on AI, streaming, 3D graphics, and building for the web.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing · Zachary Zulanas",
    description:
      "Essays and notes on AI, streaming, 3D graphics, and building for the web.",
    url: "/writing",
    type: "website",
  },
};

export default async function WritingPage() {
  const posts = await getSerializedPosts();
  const metas = getAllPosts();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zachary Zulanas — Writing",
    url: "https://zzulanas.dev/writing",
    author: { "@type": "Person", name: "Zachary Zulanas" },
    blogPost: metas.map((m) => ({
      "@type": "BlogPosting",
      headline: m.title,
      datePublished: m.date,
      keywords: m.tags.join(", "),
      url: `https://zzulanas.dev/writing/${m.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <Desktop posts={posts} initial={{ section: "writing", slug: null }} />
    </>
  );
}
