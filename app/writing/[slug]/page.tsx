import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSerializedPosts } from "@/lib/serialized";
import { getAllPosts, getPost } from "@/lib/posts";
import { Desktop } from "@/components/desktop/desktop";
import { JsonLd } from "@/components/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { title, excerpt, date, tags } = post.meta;
  const url = `/writing/${slug}`;
  return {
    title,
    description: excerpt,
    keywords: tags,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: excerpt,
      url,
      type: "article",
      publishedTime: date,
      authors: ["Zachary Zulanas"],
      tags,
      // og image is picked up automatically from opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = await getSerializedPosts();
  const { title, excerpt, date, tags } = post.meta;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    keywords: tags.join(", "),
    url: `https://zzulanas.dev/writing/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zzulanas.dev/writing/${slug}`,
    },
    image: `https://zzulanas.dev/writing/${slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: "Zachary Zulanas",
      url: "https://zzulanas.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Zachary Zulanas",
      url: "https://zzulanas.dev",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Desktop posts={posts} initial={{ section: "writing", slug }} />
    </>
  );
}
